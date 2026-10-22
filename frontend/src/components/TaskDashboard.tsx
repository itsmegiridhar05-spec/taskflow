"use client";

import React, { useState, useEffect } from "react";
import { TaskItem, TaskStatus, TaskPriority, HealthResponse, fetchHealth, getApiBaseUrl } from "@/lib/api";

const INITIAL_TASKS: TaskItem[] = [
  {
    id: "task-1",
    title: "Verify Git branching & initial repository setup",
    description: "Ensure branch feature/initial-setup is active and remote is properly tracked.",
    status: "completed",
    priority: "high",
    createdAt: "2026-10-22",
  },
  {
    id: "task-2",
    title: "Configure FastAPI backend with /health endpoint",
    description: "Implement Pydantic models, test client, and root health check status.",
    status: "completed",
    priority: "high",
    createdAt: "2026-10-22",
  },
  {
    id: "task-3",
    title: "Implement SQLAlchemy models & Alembic migrations",
    description: "Set up persistent task schema with SQLite/Postgres support.",
    status: "in_progress",
    priority: "medium",
    createdAt: "2026-10-22",
  },
  {
    id: "task-4",
    title: "Build Next.js interactive task management board",
    description: "Add filtering, dynamic status updates, and responsive UI cards.",
    status: "in_progress",
    priority: "medium",
    createdAt: "2026-10-22",
  },
  {
    id: "task-5",
    title: "Connect Frontend with Backend REST API",
    description: "Integrate live client fetches with backend task CRUD endpoints.",
    status: "pending",
    priority: "low",
    createdAt: "2026-10-22",
  },
];

export default function TaskDashboard() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<"all" | TaskStatus>("all");
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [healthLoading, setHealthLoading] = useState<boolean>(true);
  const [healthError, setHealthError] = useState<string | null>(null);

  // New task form state
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPriority, setNewPriority] = useState<TaskPriority>("medium");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const checkApiHealth = () => {
    setHealthLoading(true);
    setHealthError(null);
    fetchHealth()
      .then((data) => {
        setHealth(data);
      })
      .catch(() => {
        setHealth(null);
        setHealthError("Backend offline or unreachable");
      })
      .finally(() => {
        setHealthLoading(false);
      });
  };

  useEffect(() => {
    let isMounted = true;
    fetchHealth()
      .then((data) => {
        if (isMounted) {
          setHealth(data);
          setHealthLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHealth(null);
          setHealthError("Backend offline or unreachable");
          setHealthLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextStatus: TaskStatus =
          t.status === "completed"
            ? "pending"
            : t.status === "pending"
            ? "in_progress"
            : "completed";
        return { ...t, status: nextStatus };
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || "No description provided.",
      status: "pending",
      priority: newPriority,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTitle("");
    setNewDesc("");
    setNewPriority("medium");
    setIsAddingTask(false);
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  };

  const getPriorityBadgeClass = (priority: TaskPriority) => {
    switch (priority) {
      case "high":
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "low":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
    }
  };

  const getStatusBadgeClass = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "in_progress":
        return "bg-sky-500/10 text-sky-400 border border-sky-500/20";
      case "pending":
        return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Top Banner / API Health Indicator */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold tracking-tight text-white">System Status</h2>
            {healthLoading ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Connecting...
              </span>
            ) : health ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Backend Healthy (v{health.version})
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/30">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                {healthError}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Target API: <code className="text-sky-300 font-mono text-xs">{getApiBaseUrl()}</code>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={checkApiHealth}
            disabled={healthLoading}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer disabled:opacity-50"
          >
            Check API Health
          </button>
          <button
            onClick={() => setIsAddingTask(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/25 transition cursor-pointer"
          >
            + New Task
          </button>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Total Tasks</p>
          <p className="text-3xl font-extrabold text-white mt-2">{stats.total}</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-sky-400 font-medium">In Progress</p>
          <p className="text-3xl font-extrabold text-sky-300 mt-2">{stats.inProgress}</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-emerald-400 font-medium">Completed</p>
          <p className="text-3xl font-extrabold text-emerald-300 mt-2">{stats.completed}</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Pending</p>
          <p className="text-3xl font-extrabold text-slate-300 mt-2">{stats.pending}</p>
        </div>
      </section>

      {/* Quick Add Modal */}
      {isAddingTask && (
        <div className="bg-slate-900/95 border border-sky-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Create New Task</h3>
            <button
              onClick={() => setIsAddingTask(false)}
              className="text-slate-400 hover:text-white text-sm"
            >
              Cancel
            </button>
          </div>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Integrate user authentication"
                required
                className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Brief description of task requirements"
                rows={2}
                className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              />
            </div>
            <div className="flex gap-4 items-center">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                  className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="pt-5">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-sky-500/20 transition cursor-pointer"
                >
                  Save Task
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Main Task List & Filter Section */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Task Dashboard</h3>
            <p className="text-xs text-slate-400">Click status badge to cycle: Pending → In Progress → Completed</p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(["all", "pending", "in_progress", "completed"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition cursor-pointer ${
                  filter === tab
                    ? "bg-sky-500 text-white"
                    : "bg-slate-800/80 text-slate-400 hover:text-white"
                }`}
              >
                {tab === "in_progress" ? "In Progress" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Task Cards */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            No tasks found matching current filter.
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-slate-800/40 hover:bg-slate-800/70 border border-slate-750 hover:border-slate-700 rounded-xl p-4 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${getPriorityBadgeClass(task.priority)}`}>
                      {task.priority}
                    </span>
                    <h4 className={`text-sm font-semibold ${task.status === "completed" ? "line-through text-slate-500" : "text-white"}`}>
                      {task.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400">{task.description}</p>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer capitalize ${getStatusBadgeClass(task.status)}`}
                    title="Click to cycle status"
                  >
                    {task.status.replace("_", " ")}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-slate-500 hover:text-rose-400 text-xs px-2 py-1 transition cursor-pointer"
                    title="Delete task"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
