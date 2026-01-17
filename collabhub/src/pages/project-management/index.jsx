import React, { useState } from 'react';
import Header from '../../components/navigation/Header';
import ProjectHeader from './components/ProjectHeader';
import FilterPanel from './components/FilterPanel';
import KanbanColumn from './components/KanbanColumn';
import TaskListView from './components/TaskListView';
import TaskModal from './components/TaskModal';
import BulkActionsBar from './components/BulkActionsBar';

const ProjectManagement = () => {
  const [currentView, setCurrentView] = useState('board');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    assignees: [],
    priorities: [],
    tags: [],
    dueDate: ''
  });

  const projectData = {
    name: "Design System v2.0",
    description: "Complete redesign and implementation of the company-wide design system with new components, patterns, and documentation",
    completedTasks: 42,
    totalTasks: 68,
    daysRemaining: 18,
    deadline: "February 3, 2026",
    budgetSpent: 85,
    budgetTotal: 120,
    teamMembers: [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1995e8b9b-1763294899676.png",
      avatarAlt: "Professional headshot of Asian woman with long black hair wearing navy blazer",
      role: "Lead Designer"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12c942d4c-1763294979358.png",
      avatarAlt: "Professional headshot of African American man with short hair in gray suit",
      role: "Frontend Developer"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16473791c-1763293515771.png",
      avatarAlt: "Professional headshot of Hispanic woman with brown hair in white blouse",
      role: "UX Researcher"
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11a2a08ae-1763295050712.png",
      avatarAlt: "Professional headshot of Asian man with glasses in blue shirt",
      role: "Product Manager"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b24a7c2e-1763296129552.png",
      avatarAlt: "Professional headshot of Caucasian woman with blonde hair in black jacket",
      role: "QA Engineer"
    },
    {
      id: 6,
      name: "James Wilson",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cef3e3c2-1763295620422.png",
      avatarAlt: "Professional headshot of Caucasian man with brown hair in charcoal suit",
      role: "Backend Developer"
    }]

  };

  const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'completed', title: 'Completed' }];


  const [tasks, setTasks] = useState([
  {
    id: 1,
    title: "Design new button component variants",
    description: "Create primary, secondary, outline, and ghost button variants with hover states",
    status: "todo",
    priority: "high",
    dueDate: "2026-01-20",
    assignee: projectData?.teamMembers?.[0],
    tags: ["Design", "Frontend"],
    attachments: 3,
    comments: 5,
    subtasks: { completed: 2, total: 5 }
  },
  {
    id: 2,
    title: "Implement responsive grid system",
    description: "Build flexible grid system with breakpoints for mobile, tablet, and desktop",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-01-22",
    assignee: projectData?.teamMembers?.[1],
    tags: ["Frontend", "Urgent"],
    attachments: 1,
    comments: 8,
    subtasks: { completed: 4, total: 6 }
  },
  {
    id: 3,
    title: "Conduct usability testing for navigation",
    description: "Test new navigation patterns with 10 users and document findings",
    status: "in-progress",
    priority: "medium",
    dueDate: "2026-01-25",
    assignee: projectData?.teamMembers?.[2],
    tags: ["Testing", "Design"],
    attachments: 0,
    comments: 3,
    subtasks: { completed: 1, total: 3 }
  },
  {
    id: 4,
    title: "Update color palette documentation",
    description: "Document all color tokens with accessibility guidelines and usage examples",
    status: "review",
    priority: "medium",
    dueDate: "2026-01-18",
    assignee: projectData?.teamMembers?.[0],
    tags: ["Documentation", "Design"],
    attachments: 2,
    comments: 4,
    subtasks: { completed: 3, total: 3 }
  },
  {
    id: 5,
    title: "Create icon library",
    description: "Design and implement 50+ icons for common UI elements",
    status: "completed",
    priority: "low",
    dueDate: "2026-01-15",
    assignee: projectData?.teamMembers?.[0],
    tags: ["Design", "Feature"],
    attachments: 5,
    comments: 12,
    subtasks: { completed: 8, total: 8 }
  },
  {
    id: 6,
    title: "Build form validation system",
    description: "Implement client-side validation with error messages and success states",
    status: "todo",
    priority: "high",
    dueDate: "2026-01-28",
    assignee: projectData?.teamMembers?.[1],
    tags: ["Frontend", "Feature"],
    attachments: 0,
    comments: 2,
    subtasks: { completed: 0, total: 4 }
  },
  {
    id: 7,
    title: "Write accessibility guidelines",
    description: "Document WCAG 2.1 AA compliance requirements for all components",
    status: "in-progress",
    priority: "medium",
    dueDate: "2026-01-30",
    assignee: projectData?.teamMembers?.[2],
    tags: ["Documentation"],
    attachments: 1,
    comments: 6,
    subtasks: { completed: 2, total: 5 }
  },
  {
    id: 8,
    title: "Setup automated testing",
    description: "Configure Jest and React Testing Library for component testing",
    status: "review",
    priority: "high",
    dueDate: "2026-01-19",
    assignee: projectData?.teamMembers?.[4],
    tags: ["Testing", "Backend"],
    attachments: 0,
    comments: 7,
    subtasks: { completed: 4, total: 4 }
  }]
  );

  const tags = [
  { id: 1, name: "Frontend" },
  { id: 2, name: "Backend" },
  { id: 3, name: "Design" },
  { id: 4, name: "Bug" },
  { id: 5, name: "Feature" },
  { id: 6, name: "Documentation" },
  { id: 7, name: "Testing" },
  { id: 8, name: "Urgent" }];


  const filterTasks = (taskList) => {
    return taskList?.filter((task) => {
      if (activeFilters?.assignees?.length > 0 && !activeFilters?.assignees?.includes(task?.assignee?.id)) {
        return false;
      }
      if (activeFilters?.priorities?.length > 0 && !activeFilters?.priorities?.includes(task?.priority)) {
        return false;
      }
      if (activeFilters?.tags?.length > 0 && !task?.tags?.some((tag) => activeFilters?.tags?.includes(tag))) {
        return false;
      }
      if (activeFilters?.dueDate) {
        const taskDate = new Date(task.dueDate);
        const today = new Date();
        today?.setHours(0, 0, 0, 0);

        switch (activeFilters?.dueDate) {
          case 'overdue':
            if (taskDate >= today) return false;
            break;
          case 'today':
            if (taskDate?.toDateString() !== today?.toDateString()) return false;
            break;
          case 'week':
            const weekFromNow = new Date(today);
            weekFromNow?.setDate(today?.getDate() + 7);
            if (taskDate < today || taskDate > weekFromNow) return false;
            break;
          case 'month':
            const monthFromNow = new Date(today);
            monthFromNow?.setMonth(today?.getMonth() + 1);
            if (taskDate < today || taskDate > monthFromNow) return false;
            break;
          default:
            break;
        }
      }
      return true;
    });
  };

  const filteredTasks = filterTasks(tasks);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newStatus) => {
    e?.preventDefault();
    if (draggedTask && draggedTask?.status !== newStatus) {
      setTasks(tasks?.map((task) =>
      task?.id === draggedTask?.id ? { ...task, status: newStatus } : task
      ));
    }
    setDraggedTask(null);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleAddTask = (columnId) => {
    setSelectedTask({ status: columnId });
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (selectedTask?.id) {
      setTasks(tasks?.map((task) =>
      task?.id === selectedTask?.id ? { ...task, ...taskData } : task
      ));
    } else {
      const newTask = {
        id: Math.max(...tasks?.map((t) => t?.id)) + 1,
        ...taskData,
        assignee: projectData?.teamMembers?.find((m) => m?.id === taskData?.assignee),
        attachments: 0,
        comments: 0,
        subtasks: { completed: 0, total: 0 }
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleBulkAction = (action) => {
    if (action === 'delete') {
      setTasks(tasks?.filter((task) => !selectedTasks?.includes(task?.id)));
      setSelectedTasks([]);
    } else if (columns?.some((col) => col?.id === action)) {
      setTasks(tasks?.map((task) =>
      selectedTasks?.includes(task?.id) ? { ...task, status: action } : task
      ));
    } else if (['high', 'medium', 'low']?.includes(action)) {
      setTasks(tasks?.map((task) =>
      selectedTasks?.includes(task?.id) ? { ...task, priority: action } : task
      ));
    } else {
      const assignee = projectData?.teamMembers?.find((m) => m?.id === action);
      if (assignee) {
        setTasks(tasks?.map((task) =>
        selectedTasks?.includes(task?.id) ? { ...task, assignee } : task
        ));
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <ProjectHeader
          project={projectData}
          onFilterClick={() => setIsFilterOpen(true)}
          onViewChange={setCurrentView}
          currentView={currentView} />


        <div className="flex gap-6">
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterPanel
              isOpen={true}
              onClose={() => {}}
              onApplyFilters={setActiveFilters}
              teamMembers={projectData?.teamMembers}
              tags={tags} />

          </div>

          <div className="flex-1 min-w-0">
            {currentView === 'board' ?
            <div className="overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-max">
                  {columns?.map((column) =>
                <KanbanColumn
                  key={column?.id}
                  column={column}
                  tasks={filteredTasks?.filter((task) => task?.status === column?.id)}
                  onTaskClick={handleTaskClick}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onAddTask={handleAddTask} />

                )}
                </div>
              </div> :

            <TaskListView
              tasks={filteredTasks}
              selectedTasks={selectedTasks}
              onTaskSelect={setSelectedTasks}
              onTaskClick={handleTaskClick} />

            }
          </div>
        </div>
      </main>
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={setActiveFilters}
        teamMembers={projectData?.teamMembers}
        tags={tags} />

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
        task={selectedTask}
        teamMembers={projectData?.teamMembers}
        columns={columns} />

      <BulkActionsBar
        selectedCount={selectedTasks?.length}
        onClearSelection={() => setSelectedTasks([])}
        onBulkAction={handleBulkAction}
        columns={columns}
        teamMembers={projectData?.teamMembers} />

    </div>);

};

export default ProjectManagement;