import React from "react";
import TaskDashboard from "@/components/TaskDashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-white">
      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/20 font-bold text-white text-base">
              TF
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-white text-lg">TaskFlow</span>
              <span className="text-[10px] ml-2 font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                v0.1.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition"
            >
              API Swagger Docs ↗
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="hidden sm:inline text-slate-500 font-mono">
              FastAPI + Next.js
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-6 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <span>✨ Phase 1 Foundation Active</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight">
            Orchestrate Your Work with <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">TaskFlow</span>
          </h1>
          <p className="text-base text-slate-400 max-w-xl mx-auto">
            A high-performance task management platform powered by a FastAPI async backend, Pydantic validation, and a Next.js App Router frontend.
          </p>
        </div>
      </section>

      {/* Main Interactive Dashboard */}
      <main className="py-10 px-6">
        <TaskDashboard />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 px-6 text-center text-xs text-slate-500">
        <p>TaskFlow Project &bull; Built with FastAPI, Next.js, TypeScript, Tailwind CSS, and Docker</p>
      </footer>
    </div>
  );
}
