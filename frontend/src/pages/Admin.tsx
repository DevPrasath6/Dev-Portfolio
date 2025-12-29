import { useState, useEffect } from 'react';
import { usePortfolio, type Project, type ExperienceItem, type Education, type Certification, type Achievement } from '@/hooks/usePortfolio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Trash2, Plus, Save, ArrowLeft, LogOut, Edit2, X, Check,
    User, Briefcase, Code, Star, Mail, FolderOpen, GraduationCap,
    Building, Calendar, Link as LinkIcon, Github, ExternalLink, Award, Trophy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {
        data,
        updateHero,
        updateContact,
        addProject,
        updateProject,
        deleteProject,
        setProjects,
        addExperience,
        deleteExperience,
        updateExperience,
        setExperiences,
        addEducation,
        updateEducation,
        deleteEducation,
        addCertification,
        updateCertification,
        deleteCertification,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        // ...existing code...
    } = usePortfolio();
    const { toast } = useToast();

    // Hero state
    const [hero, setHero] = useState(data.hero);

    // Contact state
    const [contact, setContact] = useState(data.contact);

    // Project states
    const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
        title: '',
        description: '',
        imageUrl: '',
        tags: [],
        liveUrl: '',
        githubUrl: '',
    });
    const [tagInput, setTagInput] = useState('');
    const [editingProject, setEditingProject] = useState<string | null>(null);
    const [editProjectData, setEditProjectData] = useState<Project | null>(null);
    const [editProjectTagInput, setEditProjectTagInput] = useState('');

    // Experience states
    const [newExperience, setNewExperience] = useState<Omit<ExperienceItem, 'id'>>({
        title: '',
        company: '',
        period: '',
        description: '',
        current: false,
    });
    const [editingExperience, setEditingExperience] = useState<string | null>(null);
    const [editExperienceData, setEditExperienceData] = useState<ExperienceItem | null>(null);

    // Education states
    const [newEducation, setNewEducation] = useState<Omit<Education, 'id'>>({
        degree: '',
        field: '',
        institution: '',
        location: '',
        period: '',
        gpa: '',
        description: '',
        order: 0,
    });
    const [editingEducation, setEditingEducation] = useState<string | null>(null);
    const [editEducationData, setEditEducationData] = useState<Education | null>(null);

    // Certification states
    const [newCertification, setNewCertification] = useState<Omit<Certification, 'id'>>({
        name: '',
        issuer: '',
        date: '',
        credentialId: '',
        credentialUrl: '',
        expiryDate: '',
    });
    const [editingCertification, setEditingCertification] = useState<string | null>(null);
    const [editCertificationData, setEditCertificationData] = useState<Certification | null>(null);

    // Achievement states
    const [newAchievement, setNewAchievement] = useState<Omit<Achievement, 'id'>>({
        title: '',
        description: '',
        date: '',
        type: 'other',
        order: 0,
    });
    const [editingAchievement, setEditingAchievement] = useState<string | null>(null);
    const [editAchievementData, setEditAchievementData] = useState<Achievement | null>(null);

    // ...existing code...

    // Check if already authenticated
    useEffect(() => {
        const authenticated = sessionStorage.getItem('adminAuthenticated');
        if (authenticated === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuthenticated');
        setIsAuthenticated(false);
        toast({ title: 'Logged out successfully' });
    };

    // Hero handlers
    const handleSaveHero = () => {
        updateHero(hero);
        toast({ title: 'Hero section updated!' });
    };

    // Contact handlers
    const handleSaveContact = () => {
        updateContact(contact);
        toast({ title: 'Contact info updated!' });
    };

    // Project handlers
    const handleAddProject = async () => {
        if (!newProject.title || !newProject.description) {
            toast({ title: 'Please fill in title and description', variant: 'destructive' });
            return;
        }
        try {
            await addProject(newProject);
            setNewProject({ title: '', description: '', imageUrl: '', tags: [], liveUrl: '', githubUrl: '' });
            toast({ title: 'Project added!' });
        } catch (error) {
            toast({ title: 'Failed to add project', variant: 'destructive' });
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim()) {
            setNewProject(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (index: number) => {
        setNewProject(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }));
    };

    const handleDeleteProject = async (id: string) => {
        try {
            await deleteProject(id);
            toast({ title: 'Project deleted' });
        } catch (error) {
            toast({ title: 'Failed to delete project', variant: 'destructive' });
        }
    };

    const handleEditProject = (project: Project) => {
        setEditingProject(project.id);
        setEditProjectData({ ...project });
    };

    const handleSaveEditProject = async () => {
        if (editProjectData) {
            try {
                await updateProject(editProjectData.id, editProjectData);
                setEditingProject(null);
                setEditProjectData(null);
                toast({ title: 'Project updated!' });
            } catch (error) {
                toast({ title: 'Failed to update project', variant: 'destructive' });
            }
        }
    };

    const handleCancelEditProject = () => {
        setEditingProject(null);
        setEditProjectData(null);
    };

    const handleAddEditProjectTag = () => {
        if (editProjectTagInput.trim() && editProjectData) {
            setEditProjectData(prev => prev ? { ...prev, tags: [...prev.tags, editProjectTagInput.trim()] } : null);
            setEditProjectTagInput('');
        }
    };

    const handleRemoveEditProjectTag = (index: number) => {
        if (editProjectData) {
            setEditProjectData(prev => prev ? { ...prev, tags: prev.tags.filter((_, i) => i !== index) } : null);
        }
    };

    // Experience handlers
    const handleAddExperience = async () => {
        if (!newExperience.title || !newExperience.company) {
            toast({ title: 'Please fill in title and company', variant: 'destructive' });
            return;
        }
        await addExperience(newExperience);
        // Refetch experiences from backend
        await refetchExperiences();
        setNewExperience({ title: '', company: '', period: '', description: '', current: false });
        toast({ title: 'Experience added!' });
    };

    const handleDeleteExperience = async (id: string) => {
        try {
            await deleteExperience(id);
            await refetchExperiences();
            toast({ title: 'Experience deleted' });
        } catch (error) {
            toast({ title: 'Failed to delete experience', variant: 'destructive' });
        }
    };

    const handleEditExperience = (exp: ExperienceItem) => {
        setEditingExperience(exp.id);
        setEditExperienceData({ ...exp });
    };

    const handleSaveEditExperience = async () => {
        if (editExperienceData) {
            try {
                await updateExperience(editExperienceData.id, editExperienceData);
                await refetchExperiences();
                setEditingExperience(null);
                setEditExperienceData(null);
                toast({ title: 'Experience updated!' });
            } catch (error) {
                toast({ title: 'Failed to update experience', variant: 'destructive' });
            }
        }
    };
    // Refetch experiences from backend and update state
    const refetchExperiences = async () => {
        try {
            const experiences = await portfolioApi.admin.getExperiences();
            // update local state with new experiences
            setExperiences(experiences);
        } catch (err) {
            toast({ title: 'Failed to fetch experiences', variant: 'destructive' });
        }
    };

    const handleCancelEditExperience = () => {
        setEditingExperience(null);
        setEditExperienceData(null);
    };

    // Education handlers
    const handleAddEducation = async () => {
        if (!newEducation.degree || !newEducation.institution || !newEducation.period) {
            toast({ title: 'Please fill in degree, institution, and period', variant: 'destructive' });
            return;
        }
        await addEducation(newEducation);
        setNewEducation({ degree: '', field: '', institution: '', location: '', period: '', gpa: '', description: '', order: 0 });
        toast({ title: 'Education added!' });
    };

    const handleDeleteEducation = async (id: string) => {
        try {
            await deleteEducation(id);
            toast({ title: 'Education deleted' });
        } catch (error) {
            toast({ title: 'Failed to delete education', variant: 'destructive' });
        }
    };

    const handleEditEducation = (edu: Education) => {
        setEditingEducation(edu.id);
        setEditEducationData({ ...edu });
    };

    const handleSaveEditEducation = async () => {
        if (editEducationData) {
            try {
                await updateEducation(editEducationData.id, editEducationData);
                setEditingEducation(null);
                setEditEducationData(null);
                toast({ title: 'Education updated!' });
            } catch (error) {
                toast({ title: 'Failed to update education', variant: 'destructive' });
            }
        }
    };

    const handleCancelEditEducation = () => {
        setEditingEducation(null);
        setEditEducationData(null);
    };

    // Certification handlers
    const handleAddCertification = async () => {
        if (!newCertification.name || !newCertification.issuer || !newCertification.date) {
            toast({ title: 'Please fill in name, issuer, and date', variant: 'destructive' });
            return;
        }
        await addCertification(newCertification);
        setNewCertification({ name: '', issuer: '', date: '', credentialId: '', credentialUrl: '', expiryDate: '' });
        toast({ title: 'Certification added!' });
    };

    const handleDeleteCertification = async (id: string) => {
        try {
            await deleteCertification(id);
            toast({ title: 'Certification deleted' });
        } catch (error) {
            toast({ title: 'Failed to delete certification', variant: 'destructive' });
        }
    };

    const handleEditCertification = (cert: Certification) => {
        setEditingCertification(cert.id);
        setEditCertificationData({ ...cert });
    };

    const handleSaveEditCertification = async () => {
        if (editCertificationData) {
            try {
                await updateCertification(editCertificationData.id, editCertificationData);
                setEditingCertification(null);
                setEditCertificationData(null);
                toast({ title: 'Certification updated!' });
            } catch (error) {
                toast({ title: 'Failed to update certification', variant: 'destructive' });
            }
        }
    };

    const handleCancelEditCertification = () => {
        setEditingCertification(null);
        setEditCertificationData(null);
    };

    // Achievement handlers
    const handleAddAchievement = async () => {
        if (!newAchievement.title || !newAchievement.description || !newAchievement.date) {
            toast({ title: 'Please fill in title, description, and date', variant: 'destructive' });
            return;
        }
        await addAchievement(newAchievement);
        setNewAchievement({ title: '', description: '', date: '', type: 'other', order: 0 });
        toast({ title: 'Achievement added!' });
    };

    const handleDeleteAchievement = async (id: string) => {
        try {
            await deleteAchievement(id);
            toast({ title: 'Achievement deleted' });
        } catch (error) {
            toast({ title: 'Failed to delete achievement', variant: 'destructive' });
        }
    };

    const handleEditAchievement = (ach: Achievement) => {
        setEditingAchievement(ach.id);
        setEditAchievementData({ ...ach });
    };

    const handleSaveEditAchievement = async () => {
        if (editAchievementData) {
            try {
                await updateAchievement(editAchievementData.id, editAchievementData);
                setEditingAchievement(null);
                setEditAchievementData(null);
                toast({ title: 'Achievement updated!' });
            } catch (error) {
                toast({ title: 'Failed to update achievement', variant: 'destructive' });
            }
        }
    };

    const handleCancelEditAchievement = () => {
        setEditingAchievement(null);
        setEditAchievementData(null);
    };

    // ...existing code...

    if (!isAuthenticated) {
        return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
                <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                    <div className="flex items-center gap-4">
                        <h1 className="font-display text-xl md:text-2xl font-bold text-gradient">Admin Panel</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                        <Link to="/">
                            <Button variant="outline" size="sm" className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Back to Site</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container px-4 md:px-6 py-6">
                <Tabs defaultValue="hero" className="space-y-6">
                    <ScrollArea className="w-full">
                        <TabsList className="glass inline-flex w-auto min-w-full md:min-w-0 p-1">
                            <TabsTrigger value="hero" className="gap-2 text-xs md:text-sm">
                                <User className="w-4 h-4" />
                                <span className="hidden sm:inline">Hero</span>
                            </TabsTrigger>
                            <TabsTrigger value="projects" className="gap-2 text-xs md:text-sm">
                                <FolderOpen className="w-4 h-4" />
                                <span className="hidden sm:inline">Projects</span>
                            </TabsTrigger>
                            <TabsTrigger value="experience" className="gap-2 text-xs md:text-sm">
                                <Briefcase className="w-4 h-4" />
                                <span className="hidden sm:inline">Experience</span>
                            </TabsTrigger>
                            <TabsTrigger value="cv" className="gap-2 text-xs md:text-sm">
                                <GraduationCap className="w-4 h-4" />
                                <span className="hidden sm:inline">CV</span>
                            </TabsTrigger>
                            <TabsTrigger value="contact" className="gap-2 text-xs md:text-sm">
                                <Mail className="w-4 h-4" />
                                <span className="hidden sm:inline">Contact</span>
                            </TabsTrigger>
                        </TabsList>
                    </ScrollArea>

                    {/* Hero Section */}
                    <TabsContent value="hero" className="space-y-6">
                        <Card className="glass border-border">
                            <CardHeader>
                                <CardTitle className="font-display flex items-center gap-2">
                                    <User className="w-5 h-5 text-primary" />
                                    Hero Section
                                </CardTitle>
                                <CardDescription>Manage your main hero section content</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="hero-name">Full Name</Label>
                                    <Input
                                        id="hero-name"
                                        value={hero.name}
                                        onChange={e => setHero(prev => ({ ...prev, name: e.target.value }))}
                                        className="bg-input border-border"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hero-title">Professional Title</Label>
                                    <Input
                                        id="hero-title"
                                        value={hero.title}
                                        onChange={e => setHero(prev => ({ ...prev, title: e.target.value }))}
                                        className="bg-input border-border"
                                        placeholder="Full Stack Developer"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hero-subtitle">Subtitle / Tagline</Label>
                                    <Textarea
                                        id="hero-subtitle"
                                        value={hero.subtitle}
                                        onChange={e => setHero(prev => ({ ...prev, subtitle: e.target.value }))}
                                        className="bg-input border-border min-h-[100px]"
                                        placeholder="A brief description about yourself..."
                                    />
                                </div>
                                <Button onClick={handleSaveHero} className="gap-2">
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Projects Section */}
                    <TabsContent value="projects" className="space-y-6">
                        {/* Add New Project */}
                        <Card className="glass border-border">
                            <CardHeader>
                                <CardTitle className="font-display flex items-center gap-2">
                                    <Plus className="w-5 h-5 text-primary" />
                                    Add New Project
                                </CardTitle>
                                <CardDescription>Create a new portfolio project</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Project Title *</Label>
                                        <Input
                                            placeholder="My Awesome Project"
                                            value={newProject.title}
                                            onChange={e => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                                            className="bg-input border-border"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Image URL</Label>
                                        <Input
                                            placeholder="https://example.com/image.jpg"
                                            value={newProject.imageUrl}
                                            onChange={e => setNewProject(prev => ({ ...prev, imageUrl: e.target.value }))}
                                            className="bg-input border-border"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Description *</Label>
                                    <Textarea
                                        placeholder="Describe your project..."
                                        value={newProject.description}
                                        onChange={e => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                                        className="bg-input border-border min-h-[80px]"
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <ExternalLink className="w-4 h-4" />
                                            Live URL
                                        </Label>
                                        <Input
                                            placeholder="https://myproject.com"
                                            value={newProject.liveUrl}
                                            onChange={e => setNewProject(prev => ({ ...prev, liveUrl: e.target.value }))}
                                            className="bg-input border-border"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <Github className="w-4 h-4" />
                                            GitHub URL
                                        </Label>
                                        <Input
                                            placeholder="https://github.com/user/project"
                                            value={newProject.githubUrl}
                                            onChange={e => setNewProject(prev => ({ ...prev, githubUrl: e.target.value }))}
                                            className="bg-input border-border"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Tags</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Add a tag (e.g., React)"
                                            value={tagInput}
                                            onChange={e => setTagInput(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                            className="bg-input border-border"
                                        />
                                        <Button variant="secondary" onClick={handleAddTag} type="button">Add</Button>
                                    </div>
                                    {newProject.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {newProject.tags.map((tag, i) => (
                                                <Badge key={i} variant="secondary" className="gap-1">
                                                    {tag}
                                                    <button onClick={() => handleRemoveTag(i)} className="ml-1 hover:text-destructive">
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <Button onClick={handleAddProject} className="gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add Project
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Existing Projects */}
                        <Card className="glass border-border">
                            <CardHeader>
                                <CardTitle className="font-display flex items-center gap-2">
                                    <FolderOpen className="w-5 h-5 text-primary" />
                                    Existing Projects
                                </CardTitle>
                                <CardDescription>{data.projects.length} project(s)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {data.projects.length === 0 ? (
                                        <p className="text-muted-foreground text-center py-8">No projects yet. Add your first project above!</p>
                                    ) : (
                                        data.projects.map(project => (
                                            <div key={project.id} className="p-4 bg-muted/50 rounded-xl border border-border/50">
                                                {editingProject === project.id && editProjectData ? (
                                                    <div className="space-y-4">
                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            <Input
                                                                value={editProjectData.title}
                                                                onChange={e => setEditProjectData(prev => prev ? { ...prev, title: e.target.value } : null)}
                                                                className="bg-input border-border"
                                                                placeholder="Title"
                                                            />
                                                            <Input
                                                                value={editProjectData.imageUrl}
                                                                onChange={e => setEditProjectData(prev => prev ? { ...prev, imageUrl: e.target.value } : null)}
                                                                className="bg-input border-border"
                                                                placeholder="Image URL"
                                                            />
                                                        </div>
                                                        <Textarea
                                                            value={editProjectData.description}
                                                            onChange={e => setEditProjectData(prev => prev ? { ...prev, description: e.target.value } : null)}
                                                            className="bg-input border-border"
                                                            placeholder="Description"
                                                        />
                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            <Input
                                                                value={editProjectData.liveUrl || ''}
                                                                onChange={e => setEditProjectData(prev => prev ? { ...prev, liveUrl: e.target.value } : null)}
                                                                className="bg-input border-border"
                                                                placeholder="Live URL"
                                                            />
                                                            <Input
                                                                value={editProjectData.githubUrl || ''}
                                                                onChange={e => setEditProjectData(prev => prev ? { ...prev, githubUrl: e.target.value } : null)}
                                                                className="bg-input border-border"
                                                                placeholder="GitHub URL"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Tags</Label>
                                                            <div className="flex gap-2">
                                                                <Input
                                                                    placeholder="Add tag"
                                                                    value={editProjectTagInput}
                                                                    onChange={e => setEditProjectTagInput(e.target.value)}
                                                                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddEditProjectTag())}
                                                                    className="bg-input border-border"
                                                                />
                                                                <Button variant="secondary" onClick={handleAddEditProjectTag} size="sm">Add</Button>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {editProjectData.tags.map((tag, i) => (
                                                                    <Badge key={i} variant="secondary" className="gap-1">
                                                                        {tag}
                                                                        <button onClick={() => handleRemoveEditProjectTag(i)} className="ml-1 hover:text-destructive">
                                                                            <X className="w-3 h-3" />
                                                                        </button>
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button size="sm" onClick={handleSaveEditProject} className="gap-1">
                                                                <Check className="w-3 h-3" />
                                                                Save
                                                            </Button>
                                                            <Button size="sm" variant="outline" onClick={handleCancelEditProject} className="gap-1">
                                                                <X className="w-3 h-3" />
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-medium truncate">{project.title}</h4>
                                                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                                                            {project.tags.length > 0 && (
                                                                <div className="flex flex-wrap gap-1 mt-2">
                                                                    {project.tags.slice(0, 4).map((tag, i) => (
                                                                        <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                                                                    ))}
                                                                    {project.tags.length > 4 && (
                                                                        <Badge variant="outline" className="text-xs">+{project.tags.length - 4}</Badge>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex gap-2 shrink-0">
                                                            <Button variant="outline" size="icon" onClick={() => handleEditProject(project)} aria-label="Edit project">
                                                                <Edit2 className="w-4 h-4" />
                                                            </Button>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button variant="destructive" size="icon" aria-label="Delete project">
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This will permanently delete "{project.title}". This action cannot be undone.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => handleDeleteProject(project.id)}>Delete</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Experience Section */}
                    <TabsContent value="experience" className="space-y-6">
                        {/* Add New Experience */}
                        <Card className="glass border-border">
                            <CardHeader>
                                <CardTitle className="font-display flex items-center gap-2">
                                    <Plus className="w-5 h-5 text-primary" />
                                    Add Work Experience
                                </CardTitle>
                                <CardDescription>Add a new work experience entry</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <GraduationCap className="w-4 h-4" />
                                            Job Title *
                                        </Label>
                                        <Input
                                            placeholder="Senior Developer"
                                            value={newExperience.title}
                                            onChange={e => setNewExperience(prev => ({ ...prev, title: e.target.value }))}
                                            className="bg-input border-border"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <Building className="w-4 h-4" />
                                            Company *
                                        </Label>
                                        <Input
                                            placeholder="Tech Corp"
                                            value={newExperience.company}
                                            onChange={e => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                                            className="bg-input border-border"
                                        />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            Period
                                        </Label>
                                        <Input
                                            placeholder="2020 - Present"
                                            value={newExperience.period}
                                            onChange={e => setNewExperience(prev => ({ ...prev, period: e.target.value }))}
                                            className="bg-input border-border"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 pt-8">
                                        <Switch
                                            id="current-position"
                                            checked={newExperience.current}
                                            onCheckedChange={checked => setNewExperience(prev => ({ ...prev, current: checked }))}
                                        />
                                        <Label htmlFor="current-position">Current Position</Label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        placeholder="Describe your responsibilities and achievements..."
                                        value={newExperience.description}
                                        onChange={e => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                                        className="bg-input border-border min-h-[80px]"
                                    />
                                </div>
                                <Button onClick={handleAddExperience} className="gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add Experience
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Existing Experiences */}
                        <Card className="glass border-border">
                            <CardHeader>
                                <CardTitle className="font-display flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-primary" />
                                    Work History
                                </CardTitle>
                                <CardDescription>{data.experiences.length} experience(s)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {data.experiences.length === 0 ? (
                                        <p className="text-muted-foreground text-center py-8">No experiences yet. Add your first job above!</p>
                                    ) : (
                                        data.experiences.map(exp => (
                                            <div key={exp.id} className="p-4 bg-muted/50 rounded-xl border border-border/50">
                                                {editingExperience === exp.id && editExperienceData ? (
                                                    <div className="space-y-4">
                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            <Input
                                                                value={editExperienceData.title}
                                                                onChange={e => setEditExperienceData(prev => prev ? { ...prev, title: e.target.value } : null)}
                                                                className="bg-input border-border"
                                                                placeholder="Job Title"
                                                            />
                                                            <Input
                                                                value={editExperienceData.company}
                                                                onChange={e => setEditExperienceData(prev => prev ? { ...prev, company: e.target.value } : null)}
                                                                className="bg-input border-border"
                                                                placeholder="Company"
                                                            />
                                                        </div>
                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            <Input
                                                                value={editExperienceData.period}
                                                                onChange={e => setEditExperienceData(prev => prev ? { ...prev, period: e.target.value } : null)}
                                                                className="bg-input border-border"
                                                                placeholder="Period"
                                                            />
                                                            <div className="flex items-center gap-2">
                                                                <Switch
                                                                    checked={editExperienceData.current}
                                                                    onCheckedChange={checked => setEditExperienceData(prev => prev ? { ...prev, current: checked } : null)}
                                                                />
                                                                <Label>Current Position</Label>
                                                            </div>
                                                        </div>
                                                        <Textarea
                                                            value={editExperienceData.description}
                                                            onChange={e => setEditExperienceData(prev => prev ? { ...prev, description: e.target.value } : null)}
                                                            className="bg-input border-border"
                                                            placeholder="Description"
                                                        />
                                                        <div className="flex gap-2">
                                                            <Button size="sm" onClick={handleSaveEditExperience} className="gap-1">
                                                                <Check className="w-3 h-3" />
                                                                Save
                                                            </Button>
                                                            <Button size="sm" variant="outline" onClick={handleCancelEditExperience} className="gap-1">
                                                                <X className="w-3 h-3" />
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-medium">{exp.title}</h4>
                                                                {exp.current && <Badge className="bg-primary/20 text-primary text-xs">Current</Badge>}
                                                            </div>
                                                            <p className="text-sm text-primary">{exp.company}</p>
                                                            <p className="text-xs text-muted-foreground">{exp.period}</p>
                                                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{exp.description}</p>
                                                        </div>
                                                        <div className="flex gap-2 shrink-0">
                                                            <Button variant="outline" size="icon" onClick={() => handleEditExperience(exp)} aria-label="Edit experience">
                                                                <Edit2 className="w-4 h-4" />
                                                            </Button>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button variant="destructive" size="icon" aria-label="Delete experience">
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Delete Experience?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This will permanently delete your experience at "{exp.company}". This action cannot be undone.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => handleDeleteExperience(exp.id)}>Delete</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* CV Section */}
                    <TabsContent value="cv" className="space-y-6">
                        <Tabs defaultValue="education" className="space-y-6">
                            <TabsList className="glass inline-flex w-auto p-1">
                                <TabsTrigger value="education" className="gap-2 text-xs md:text-sm">
                                    <GraduationCap className="w-4 h-4" />
                                    Education
                                </TabsTrigger>
                                <TabsTrigger value="certifications" className="gap-2 text-xs md:text-sm">
                                    <Award className="w-4 h-4" />
                                    Certifications
                                </TabsTrigger>
                                <TabsTrigger value="achievements" className="gap-2 text-xs md:text-sm">
                                    <Trophy className="w-4 h-4" />
                                    Achievements
                                </TabsTrigger>
                            </TabsList>

                            {/* Education Sub-tab */}
                            <TabsContent value="education" className="space-y-6">
                                {/* Add New Education */}
                                <Card className="glass border-border">
                                    <CardHeader>
                                        <CardTitle className="font-display flex items-center gap-2">
                                            <Plus className="w-5 h-5 text-primary" />
                                            Add Education
                                        </CardTitle>
                                        <CardDescription>Add a new education entry</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Degree *</Label>
                                                <Input
                                                    placeholder="Bachelor of Science"
                                                    value={newEducation.degree}
                                                    onChange={e => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                                                    className="bg-input border-border"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Field of Study</Label>
                                                <Input
                                                    placeholder="Computer Science"
                                                    value={newEducation.field}
                                                    onChange={e => setNewEducation(prev => ({ ...prev, field: e.target.value }))}
                                                    className="bg-input border-border"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Institution *</Label>
                                                <Input
                                                    placeholder="University Name"
                                                    value={newEducation.institution}
                                                    onChange={e => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
                                                    className="bg-input border-border"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Location</Label>
                                                <Input
                                                    placeholder="City, Country"
                                                    value={newEducation.location}
                                                    onChange={e => setNewEducation(prev => ({ ...prev, location: e.target.value }))}
                                                    className="bg-input border-border"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Period *</Label>
                                                <Input
                                                    placeholder="2016 - 2020"
                                                    value={newEducation.period}
                                                    onChange={e => setNewEducation(prev => ({ ...prev, period: e.target.value }))}
                                                    className="bg-input border-border"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>GPA</Label>
                                                <Input
                                                    placeholder="3.8"
                                                    value={newEducation.gpa}
                                                    onChange={e => setNewEducation(prev => ({ ...prev, gpa: e.target.value }))}
                                                    className="bg-input border-border"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Description</Label>
                                            <Textarea
                                                placeholder="Describe your studies, achievements, or relevant coursework..."
                                                value={newEducation.description}
                                                onChange={e => setNewEducation(prev => ({ ...prev, description: e.target.value }))}
                                                className="bg-input border-border min-h-[80px]"
                                            />
                                        </div>
                                        <Button onClick={handleAddEducation} className="gap-2">
                                            <Plus className="w-4 h-4" />
                                            Add Education
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Existing Education */}
                                <Card className="glass border-border">
                                    <CardHeader>
                                        <CardTitle className="font-display flex items-center gap-2">
                                            <GraduationCap className="w-5 h-5 text-primary" />
                                            Education History
                                        </CardTitle>
                                        <CardDescription>{data.education.length} education(s)</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {data.education.length === 0 ? (
                                                <p className="text-muted-foreground text-center py-8">No education entries yet. Add your first education above!</p>
                                            ) : (
                                                data.education.map(edu => (
                                                    <div key={edu.id} className="p-4 bg-muted/50 rounded-xl border border-border/50">
                                                        {editingEducation === edu.id && editEducationData ? (
                                                            <div className="space-y-4">
                                                                <div className="grid md:grid-cols-2 gap-4">
                                                                    <Input
                                                                        value={editEducationData.degree}
                                                                        onChange={e => setEditEducationData(prev => prev ? { ...prev, degree: e.target.value } : null)}
                                                                        className="bg-input border-border"
                                                                        placeholder="Degree"
                                                                    />
                                                                    <Input
                                                                        value={editEducationData.field}
                                                                        onChange={e => setEditEducationData(prev => prev ? { ...prev, field: e.target.value } : null)}
                                                                        className="bg-input border-border"
                                                                        placeholder="Field"
                                                                    />
                                                                </div>
                                                                <div className="grid md:grid-cols-2 gap-4">
                                                                    <Input
                                                                        value={editEducationData.institution}
                                                                        onChange={e => setEditEducationData(prev => prev ? { ...prev, institution: e.target.value } : null)}
                                                                        className="bg-input border-border"
                                                                        placeholder="Institution"
                                                                    />
                                                                    <Input
                                                                        value={editEducationData.location}
                                                                        onChange={e => setEditEducationData(prev => prev ? { ...prev, location: e.target.value } : null)}
                                                                        className="bg-input border-border"
                                                                        placeholder="Location"
                                                                    />
                                                                </div>
                                                                <div className="grid md:grid-cols-2 gap-4">
                                                                    <Input
                                                                        value={editEducationData.period}
                                                                        onChange={e => setEditEducationData(prev => prev ? { ...prev, period: e.target.value } : null)}
                                                                        className="bg-input border-border"
                                                                        placeholder="Period"
                                                                    />
                                                                    <Input
                                                                        value={editEducationData.gpa}
                                                                        onChange={e => setEditEducationData(prev => prev ? { ...prev, gpa: e.target.value } : null)}
                                                                        className="bg-input border-border"
                                                                        placeholder="GPA"
                                                                    />
                                                                </div>
                                                                <Textarea
                                                                    value={editEducationData.description}
                                                                    onChange={e => setEditEducationData(prev => prev ? { ...prev, description: e.target.value } : null)}
                                                                    className="bg-input border-border"
                                                                    placeholder="Description"
                                                                />
                                                                <div className="flex gap-2">
                                                                    <Button size="sm" onClick={handleSaveEditEducation} className="gap-1">
                                                                        <Check className="w-3 h-3" />
                                                                        Save
                                                                    </Button>
                                                                    <Button size="sm" variant="outline" onClick={handleCancelEditEducation} className="gap-1">
                                                                        <X className="w-3 h-3" />
                                                                        Cancel
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div className="flex-1">
                                                                    <h4 className="font-medium">{edu.degree} in {edu.field}</h4>
                                                                    <p className="text-sm text-primary">{edu.institution}</p>
                                                                    <p className="text-xs text-muted-foreground">{edu.location} • {edu.period}</p>
                                                                    {edu.gpa && <p className="text-xs text-muted-foreground">GPA: {edu.gpa}</p>}
                                                                    {edu.description && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{edu.description}</p>}
                                                                </div>
                                                                <div className="flex gap-2 shrink-0">
                                                                    <Button variant="outline" size="icon" onClick={() => handleEditEducation(edu)} aria-label="Edit education">
                                                                        <Edit2 className="w-4 h-4" />
                                                                    </Button>
                                                                    <AlertDialog>
                                                                        <AlertDialogTrigger asChild>
                                                                            <Button variant="destructive" size="icon" aria-label="Delete education">
                                                                                <Trash2 className="w-4 h-4" />
                                                                            </Button>
                                                                        </AlertDialogTrigger>
                                                                        <AlertDialogContent>
                                                                            <AlertDialogHeader>
                                                                                <AlertDialogTitle>Delete Education?</AlertDialogTitle>
                                                                                <AlertDialogDescription>
                                                                                    This will permanently delete your education at "{edu.institution}". This action cannot be undone.
                                                                                </AlertDialogDescription>
                                                                            </AlertDialogHeader>
                                                                            <AlertDialogFooter>
                                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                                <AlertDialogAction onClick={() => handleDeleteEducation(edu.id)}>Delete</AlertDialogAction>
                                                                            </AlertDialogFooter>
                                                                        </AlertDialogContent>
                                                                    </AlertDialog>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Certifications Sub-tab */}
                            <TabsContent value="certifications" className="space-y-6">
                                {/* Add New Certification */}
                                <Card className="glass border-border">
                                    <CardHeader>
                                        <CardTitle className="font-display flex items-center gap-2">
                                            <Plus className="w-5 h-5 text-primary" />
                                            Add Certification
                                        </CardTitle>
                                        <CardDescription>Add a new certification</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Certification Name *</Label>
                                                <Input
                                                    placeholder="AWS Certified Developer"
                                                    value={newCertification.name}
                                                    onChange={e => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                                                    className="bg-input border-border"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Issuer *</Label>
                                                <Input
                                                    placeholder="Amazon Web Services"
                                                    value={newCertification.issuer}
                                                    onChange={e => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                                                    className="bg-input border-border"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Issue Date *</Label>
                                                <Input
                                                    type="date"
                                                    value={newCertification.date}
                                                    onChange={e => setNewCertification(prev => ({ ...prev, date: e.target.value }))}
                                                    className="bg-input border-border"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Expiry Date</Label>
                                                <Input
                                                    type="date"
                                                    value={newCertification.expiryDate}
                                                    onChange={e => setNewCertification(prev => ({ ...prev, expiryDate: e.target.value }))}
                                                    className="bg-input border-border"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Credential ID</Label>
                                                <Input
                                                    placeholder="ABC123456"
                                                    value={newCertification.credentialId}
                                                    onChange={e => setNewCertification(prev => ({ ...prev, credentialId: e.target.value }))}
                                                    className="bg-input border-border"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Credential URL</Label>
                                                <Input
                                                    placeholder="https://verify.certification.com/..."
                                                    value={newCertification.credentialUrl}
                                                    onChange={e => setNewCertification(prev => ({ ...prev, credentialUrl: e.target.value }))}
                                                    className="bg-input border-border"
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={handleAddCertification} className="gap-2">
                                            <Plus className="w-4 h-4" />
                                            Add Certification
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Existing Certifications */}
                                <Card className="glass border-border">
                                    <CardHeader>
                                        <CardTitle className="font-display flex items-center gap-2">
                                            <Award className="w-5 h-5 text-primary" />
                                            Certifications
                                        </CardTitle>
                                        <CardDescription>{data.certifications.length} certification(s)</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {data.certifications.length === 0 ? (
                                                <p className="text-muted-foreground text-center py-8">No certifications yet. Add your first certification above!</p>
                                            ) : (
                                                data.certifications.map(cert => (
                                                    <div key={cert.id} className="p-4 bg-muted/50 rounded-xl border border-border/50">
                                                        {editingCertification === cert.id && editCertificationData ? (
                                                            <div className="space-y-4">
                                                                <div className="grid md:grid-cols-2 gap-4">
                                                                    <Input
                                                                        value={editCertificationData.name}
                                                                        onChange={e => setEditCertificationData(prev => prev ? { ...prev, name: e.target.value } : null)}
                                                                        className="bg-input border-border"
                                                                        placeholder="Certification Name"
                                                                    />
                                                                    <Input
                                                                        value={editCertificationData.issuer}
                                                                        onChange={e => setEditCertificationData(prev => prev ? { ...prev, issuer: e.target.value } : null)}
                                                                        className="bg-input border-border"
                                                                        placeholder="Issuer"
                                                                    />
                                                                </div>
                                                                <div className="grid md:grid-cols-2 gap-4">
                                                                    <Input
                                                                        type="date"
                                                                        value={editCertificationData.date}
                                                                        onChange={e => setEditCertificationData(prev => prev ? { ...prev, date: e.target.value } : null)}
                                                                        className="bg-input border-border"
                                                                    />
                                                                    <Input
                                                                        type="date"
                                                                        value={editCertificationData.expiryDate}
                                                                        onChange={e => setEditCertificationData(prev => prev ? { ...prev, expiryDate: e.target.value } : null)}
                                                                        className="bg-input border-border"
                                                                    />
                                                                </div>
                                                                <div className="grid md:grid-cols-2 gap-4">
                                                                    <Input
                                                                        value={editCertificationData.credentialId}
                                                                        onChange={e => setEditCertificationData(prev => prev ? { ...prev, credentialId: e.target.value } : null)}
                                                                        className="bg-input border-border"
                                                                        placeholder="Credential ID"
                                                                    />
                                                                    <Input
                                                                        value={editCertificationData.credentialUrl}
                                                                        onChange={e => setEditCertificationData(prev => prev ? { ...prev, credentialUrl: e.target.value } : null)}
                                                                        className="bg-input border-border"
                                                                        placeholder="Credential URL"
                                                                    />
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <Button size="sm" onClick={handleSaveEditCertification} className="gap-1">
                                                                        <Check className="w-3 h-3" />
                                                                        Save
                                                                    </Button>
                                                                    <Button size="sm" variant="outline" onClick={handleCancelEditCertification} className="gap-1">
                                                                        <X className="w-3 h-3" />
                                                                        Cancel
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div className="flex-1">
                                                                    <h4 className="font-medium">{cert.name}</h4>
                                                                    <p className="text-sm text-primary">{cert.issuer}</p>
                                                                    <p className="text-xs text-muted-foreground">Issued: {new Date(cert.date).toLocaleDateString()}</p>
                                                                    {cert.expiryDate && <p className="text-xs text-muted-foreground">Expires: {new Date(cert.expiryDate).toLocaleDateString()}</p>}
                                                                    {cert.credentialId && <p className="text-xs text-muted-foreground">ID: {cert.credentialId}</p>}
                                                                    {cert.credentialUrl && (
                                                                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                                                                            View Credential
                                                                        </a>
                                                                    )}
                                                                </div>
                                                                <div className="flex gap-2 shrink-0">
                                                                    <Button variant="outline" size="icon" onClick={() => handleEditCertification(cert)} aria-label="Edit certification">
                                                                        <Edit2 className="w-4 h-4" />
                                                                    </Button>
                                                                    <AlertDialog>
                                                                        <AlertDialogTrigger asChild>
                                                                            <Button variant="destructive" size="icon" aria-label="Delete certification">
                                                                                <Trash2 className="w-4 h-4" />
                                                                            </Button>
                                                                        </AlertDialogTrigger>
                                                                        <AlertDialogContent>
                                                                            <AlertDialogHeader>
                                                                                <AlertDialogTitle>Delete Certification?</AlertDialogTitle>
                                                                                <AlertDialogDescription>
                                                                                    This will permanently delete your certification "{cert.name}". This action cannot be undone.
                                                                                </AlertDialogDescription>
                                                                            </AlertDialogHeader>
                                                                            <AlertDialogFooter>
                                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                                <AlertDialogAction onClick={() => handleDeleteCertification(cert.id)}>Delete</AlertDialogAction>
                                                                            </AlertDialogFooter>
                                                                        </AlertDialogContent>
                                                                    </AlertDialog>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Achievements Sub-tab */}
                            <TabsContent value="achievements" className="space-y-6">
                                {/* Add New Achievement */}
                                <Card className="glass border-border">
                                    <CardHeader>
                                        <CardTitle className="font-display flex items-center gap-2">
                                            <Plus className="w-5 h-5 text-primary" />
                                            Add Achievement
                                        </CardTitle>
                                        <CardDescription>Add a new achievement or recognition</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Title *</Label>
                                            <Input
                                                placeholder="Best Developer Award 2023"
                                                value={newAchievement.title}
                                                onChange={e => setNewAchievement(prev => ({ ...prev, title: e.target.value }))}
                                                className="bg-input border-border"
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Date *</Label>
                                                <Input
                                                    type="date"
                                                    value={newAchievement.date}
                                                    onChange={e => setNewAchievement(prev => ({ ...prev, date: e.target.value }))}
                                                    className="bg-input border-border"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Type</Label>
                                                <select
                                                    value={newAchievement.type}
                                                    onChange={e => setNewAchievement(prev => ({ ...prev, type: e.target.value as any }))}
                                                    className="w-full px-3 py-2 bg-input border border-border rounded-md"
                                                >
                                                    <option value="award">Award</option>
                                                    <option value="recognition">Recognition</option>
                                                    <option value="publication">Publication</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Description *</Label>
                                            <Textarea
                                                placeholder="Describe the achievement, what it was for, and its significance..."
                                                value={newAchievement.description}
                                                onChange={e => setNewAchievement(prev => ({ ...prev, description: e.target.value }))}
                                                className="bg-input border-border min-h-[80px]"
                                            />
                                        </div>
                                        <Button onClick={handleAddAchievement} className="gap-2">
                                            <Plus className="w-4 h-4" />
                                            Add Achievement
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Existing Achievements */}
                                <Card className="glass border-border">
                                    <CardHeader>
                                        <CardTitle className="font-display flex items-center gap-2">
                                            <Trophy className="w-5 h-5 text-primary" />
                                            Achievements
                                        </CardTitle>
                                        <CardDescription>{data.achievements.length} achievement(s)</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {data.achievements.length === 0 ? (
                                                <p className="text-muted-foreground text-center py-8">No achievements yet. Add your first achievement above!</p>
                                            ) : (
                                                data.achievements.map(ach => (
                                                    <div key={ach.id} className="p-4 bg-muted/50 rounded-xl border border-border/50">
                                                        {editingAchievement === ach.id && editAchievementData ? (
                                                            <div className="space-y-4">
                                                                <Input
                                                                    value={editAchievementData.title}
                                                                    onChange={e => setEditAchievementData(prev => prev ? { ...prev, title: e.target.value } : null)}
                                                                    className="bg-input border-border"
                                                                    placeholder="Title"
                                                                />
                                                                <div className="grid md:grid-cols-2 gap-4">
                                                                    <Input
                                                                        type="date"
                                                                        value={editAchievementData.date}
                                                                        onChange={e => setEditAchievementData(prev => prev ? { ...prev, date: e.target.value } : null)}
                                                                        className="bg-input border-border"
                                                                    />
                                                                    <select
                                                                        value={editAchievementData.type}
                                                                        onChange={e => setEditAchievementData(prev => prev ? { ...prev, type: e.target.value as any } : null)}
                                                                        className="w-full px-3 py-2 bg-input border border-border rounded-md"
                                                                    >
                                                                        <option value="award">Award</option>
                                                                        <option value="recognition">Recognition</option>
                                                                        <option value="publication">Publication</option>
                                                                        <option value="other">Other</option>
                                                                    </select>
                                                                </div>
                                                                <Textarea
                                                                    value={editAchievementData.description}
                                                                    onChange={e => setEditAchievementData(prev => prev ? { ...prev, description: e.target.value } : null)}
                                                                    className="bg-input border-border"
                                                                    placeholder="Description"
                                                                />
                                                                <div className="flex gap-2">
                                                                    <Button size="sm" onClick={handleSaveEditAchievement} className="gap-1">
                                                                        <Check className="w-3 h-3" />
                                                                        Save
                                                                    </Button>
                                                                    <Button size="sm" variant="outline" onClick={handleCancelEditAchievement} className="gap-1">
                                                                        <X className="w-3 h-3" />
                                                                        Cancel
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div className="flex-1">
                                                                    <h4 className="font-medium">{ach.title}</h4>
                                                                    <p className="text-xs text-muted-foreground capitalize">{ach.type} • {new Date(ach.date).toLocaleDateString()}</p>
                                                                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{ach.description}</p>
                                                                </div>
                                                                <div className="flex gap-2 shrink-0">
                                                                    <Button variant="outline" size="icon" onClick={() => handleEditAchievement(ach)} aria-label="Edit achievement">
                                                                        <Edit2 className="w-4 h-4" />
                                                                    </Button>
                                                                    <AlertDialog>
                                                                        <AlertDialogTrigger asChild>
                                                                            <Button variant="destructive" size="icon" aria-label="Delete achievement">
                                                                                <Trash2 className="w-4 h-4" />
                                                                            </Button>
                                                                        </AlertDialogTrigger>
                                                                        <AlertDialogContent>
                                                                            <AlertDialogHeader>
                                                                                <AlertDialogTitle>Delete Achievement?</AlertDialogTitle>
                                                                                <AlertDialogDescription>
                                                                                    This will permanently delete your achievement "{ach.title}". This action cannot be undone.
                                                                                </AlertDialogDescription>
                                                                            </AlertDialogHeader>
                                                                            <AlertDialogFooter>
                                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                                <AlertDialogAction onClick={() => handleDeleteAchievement(ach.id)}>Delete</AlertDialogAction>
                                                                            </AlertDialogFooter>
                                                                        </AlertDialogContent>
                                                                    </AlertDialog>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </TabsContent>

                    {/* ...existing code... */}

                    {/* Contact Section */}
                    <TabsContent value="contact" className="space-y-6">
                        <Card className="glass border-border">
                            <CardHeader>
                                <CardTitle className="font-display flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-primary" />
                                    Contact Information
                                </CardTitle>
                                <CardDescription>Update your contact details and social links</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        Email Address
                                    </Label>
                                    <Input
                                        type="email"
                                        value={contact.email}
                                        onChange={e => setContact(prev => ({ ...prev, email: e.target.value }))}
                                        className="bg-input border-border"
                                        placeholder="hello@example.com"
                                    />
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <LinkIcon className="w-4 h-4" />
                                        LinkedIn Profile URL
                                    </Label>
                                    <Input
                                        value={contact.linkedin || ''}
                                        onChange={e => setContact(prev => ({ ...prev, linkedin: e.target.value }))}
                                        className="bg-input border-border"
                                        placeholder="https://linkedin.com/in/yourprofile"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Github className="w-4 h-4" />
                                        GitHub Profile URL
                                    </Label>
                                    <Input
                                        value={contact.github || ''}
                                        onChange={e => setContact(prev => ({ ...prev, github: e.target.value }))}
                                        className="bg-input border-border"
                                        placeholder="https://github.com/yourusername"
                                    />
                                </div>
                                <Button onClick={handleSaveContact} className="gap-2">
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default Admin;
