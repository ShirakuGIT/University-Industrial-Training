// Task Management System
class TaskManager {
    constructor() {
        this.tasks = [
            { id: 1, text: "Review quarterly marketing reports", completed: false, priority: "high", category: "work" },
            { id: 2, text: "Update portfolio website design", completed: true, priority: "medium", category: "personal" },
            { id: 3, text: "Schedule team standup meetings", completed: false, priority: "high", category: "work" },
            { id: 4, text: "Buy groceries for the week", completed: false, priority: "low", category: "personal" },
            { id: 5, text: "Complete React course module 5", completed: true, priority: "medium", category: "learning" },
            { id: 6, text: "Prepare presentation for client meeting", completed: false, priority: "high", category: "work" },
            { id: 7, text: "Book flight tickets for vacation", completed: false, priority: "medium", category: "personal" },
            { id: 8, text: "Organize digital photo library", completed: true, priority: "low", category: "personal" },
            { id: 9, text: "Write blog post about productivity", completed: false, priority: "medium", category: "personal" },
            { id: 10, text: "Renew gym membership", completed: false, priority: "low", category: "health" },
            { id: 11, text: "Research new project management tools", completed: true, priority: "medium", category: "work" },
            { id: 12, text: "Plan weekend hiking trip", completed: false, priority: "low", category: "personal" }
        ];
        this.currentFilter = 'all';
        this.taskIdCounter = 13;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.renderTasks();
        this.updateStats();
        this.initParticles();
    }

    setupEventListeners() {
        // Add task button
        document.getElementById('add-task-btn').addEventListener('click', () => {
            this.toggleAddTaskForm();
        });

        // Submit task
        document.getElementById('submit-task').addEventListener('click', () => {
            this.addTask();
        });

        // Task input Enter key
        document.getElementById('task-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
    }

    initializeAnimations() {
        // Initialize typed.js for title
        new Typed('#typed-title', {
            strings: ['TaskFlow', 'Stay Organized', 'Boost Productivity'],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });

        // Initialize Splitting.js for text animations
        Splitting();

        // Animate stats cards on load
        anime({
            targets: '.glass',
            translateY: [30, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutCubic'
        });
    }

    initParticles() {
        // Simple particle system using p5.js
        new p5((p) => {
            let particles = [];
            
            p.setup = () => {
                let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent('particles-container');
                canvas.style('position', 'fixed');
                canvas.style('top', '0');
                canvas.style('left', '0');
                canvas.style('z-index', '-1');
                
                // Create particles
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        vx: p.random(-0.5, 0.5),
                        vy: p.random(-0.5, 0.5),
                        size: p.random(2, 6),
                        opacity: p.random(0.1, 0.3)
                    });
                }
            };
            
            p.draw = () => {
                p.clear();
                
                particles.forEach(particle => {
                    p.fill(51, 65, 85, particle.opacity * 255);
                    p.noStroke();
                    p.circle(particle.x, particle.y, particle.size);
                    
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    if (particle.x < 0 || particle.x > p.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > p.height) particle.vy *= -1;
                });
            };
            
            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        });
    }

    toggleAddTaskForm() {
        const form = document.getElementById('add-task-form');
        const isOpen = form.classList.contains('open');
        
        if (isOpen) {
            form.classList.remove('open');
        } else {
            form.classList.add('open');
            document.getElementById('task-input').focus();
        }
    }

    addTask() {
        const input = document.getElementById('task-input');
        const priority = document.getElementById('priority-select').value;
        const text = input.value.trim();
        
        if (!text) return;
        
        const newTask = {
            id: this.taskIdCounter++,
            text: text,
            completed: false,
            priority: priority,
            category: 'personal'
        };
        
        this.tasks.unshift(newTask);
        input.value = '';
        
        // Close form with animation
        document.getElementById('add-task-form').classList.remove('open');
        
        // Animate new task addition
        this.renderTasks();
        this.updateStats();
        
        // Highlight new task
        setTimeout(() => {
            const newTaskElement = document.querySelector(`[data-task-id="${newTask.id}"]`);
            if (newTaskElement) {
                anime({
                    targets: newTaskElement,
                    scale: [1.05, 1],
                    backgroundColor: ['#F0FDFA', '#FFFFFF'],
                    duration: 600,
                    easing: 'easeOutCubic'
                });
            }
        }, 100);
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            
            // Animate checkbox
            const checkbox = document.querySelector(`[data-task-id="${taskId}"] .task-checkbox`);
            const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);
            
            if (task.completed) {
                anime({
                    targets: checkbox,
                    scale: [1, 1.2, 1],
                    duration: 300,
                    easing: 'easeOutCubic'
                });
                
                taskCard.classList.add('completed');
            } else {
                taskCard.classList.remove('completed');
            }
            
            this.updateStats();
        }
    }

    deleteTask(taskId) {
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        
        // Animate removal
        anime({
            targets: taskElement,
            translateX: -300,
            opacity: 0,
            duration: 400,
            easing: 'easeInCubic',
            complete: () => {
                this.tasks = this.tasks.filter(t => t.id !== taskId);
                this.renderTasks();
                this.updateStats();
            }
        });
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.renderTasks();
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            default:
                return this.tasks;
        }
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        const filteredTasks = this.getFilteredTasks();
        
        taskList.innerHTML = '';
        
        filteredTasks.forEach((task, index) => {
            const taskElement = this.createTaskElement(task);
            taskList.appendChild(taskElement);
            
            // Stagger animation for task cards
            anime({
                targets: taskElement,
                translateY: [20, 0],
                opacity: [0, 1],
                delay: index * 50,
                duration: 400,
                easing: 'easeOutCubic'
            });
        });
    }

    createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-card bg-white rounded-xl p-6 border border-gray-200 priority-${task.priority} ${task.completed ? 'completed' : ''}`;
        taskDiv.dataset.taskId = task.id;
        
        taskDiv.innerHTML = `
            <div class="flex items-center gap-4">
                <button class="task-checkbox w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-teal-500 transition-colors ${task.completed ? 'bg-teal-500 border-teal-500' : ''}" 
                        onclick="taskManager.toggleTask(${task.id})">
                    ${task.completed ? '<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>' : ''}
                </button>
                
                <div class="flex-1">
                    <p class="task-text text-slate-800 font-medium">${task.text}</p>
                    <div class="flex items-center gap-3 mt-2">
                        <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 capitalize">${task.priority}</span>
                        <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 capitalize">${task.category}</span>
                    </div>
                </div>
                
                <button class="text-gray-400 hover:text-red-500 transition-colors p-2" onclick="taskManager.deleteTask(${task.id})">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        `;
        
        return taskDiv;
    }

    updateStats() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        
        // Animate number changes
        anime({
            targets: '#total-tasks',
            innerHTML: [parseInt(document.getElementById('total-tasks').textContent), totalTasks],
            duration: 800,
            round: 1,
            easing: 'easeOutCubic'
        });
        
        anime({
            targets: '#completed-tasks',
            innerHTML: [parseInt(document.getElementById('completed-tasks').textContent), completedTasks],
            duration: 800,
            round: 1,
            easing: 'easeOutCubic'
        });
        
        anime({
            targets: '#progress-percent',
            innerHTML: [parseInt(document.getElementById('progress-percent').textContent), progressPercent + '%'],
            duration: 800,
            round: 1,
            easing: 'easeOutCubic'
        });
    }
}

// Initialize the task manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.taskManager = new TaskManager();
});