import React, { useState } from 'react'
import type { Course, Student, ActiveTab, GradeEntryData, AttendanceRecord } from '../types/teacher'
import { GradeEntry } from '../components/GradeEntry'
import { AttendanceEntry } from '../components/AttendanceEntry'
// Données fictives pour démonstration
const MOCK_COURSES: Course[] = [
  { id: 'c1', name: 'Mathématiques', code: 'MATH101', classGroup: 'Terminales A', studentCount: 28 },
  { id: 'c2', name: 'Physique-Chimie', code: 'PHYS202', classGroup: 'Premières S', studentCount: 32 },
  { id: 'c3', name: 'Informatique', code: 'INFO301', classGroup: 'Terminales C', studentCount: 24 },
];

const MOCK_STUDENTS: Student[] = [
  { id: 's1', firstName: 'Jean', lastName: 'Dupont', rollNumber: '001' },
  { id: 's2', firstName: 'Marie', lastName: 'Curie', rollNumber: '002' },
  { id: 's3', firstName: 'Pierre', lastName: 'Martin', rollNumber: '003' },
  { id: 's4', firstName: 'Awa', lastName: 'Kone', rollNumber: '004' },
];

export const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const handleSaveGrades = (courseId: string, assessmentName: string, grades: GradeEntryData[]) => {
    console.log('Notes enregistrées:', { courseId, assessmentName, grades });
    alert('Notes enregistrées avec succès !');
    setActiveTab('dashboard');
  };

  const handleSaveAttendance = (courseId: string, date: string, records: AttendanceRecord[]) => {
    console.log('Présences enregistrées:', { courseId, date, records });
    alert('Appel validé avec succès !');
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar Supérieure */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-base sm:text-lg">
              E
            </div>
            <span className="font-bold text-base sm:text-lg text-slate-800 truncate">Espace Enseignant</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:inline text-sm font-medium text-slate-600">Prof. Thomas Martin</span>
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
              TM
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Navigation Onglets */}
        <div className="flex flex-wrap gap-2 sm:gap-8 border-b border-slate-200 mb-6 sm:mb-8">
          {(
            [
              { id: 'dashboard', label: 'Vue d\'ensemble' },
              { id: 'grades', label: 'Saisie des notes' },
              { id: 'attendance', label: 'Gestion des présences' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-semibold transition-colors relative ${
                activeTab === tab.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Vue D'ensemble / Dashboard Home */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-[10px] sm:text-xs font-semibold uppercase text-slate-400">Cours Assignés</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-2">{MOCK_COURSES.length}</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-[10px] sm:text-xs font-semibold uppercase text-slate-400">Total Élèves</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-2">
                  {MOCK_COURSES.reduce((acc, c) => acc + c.studentCount, 0)}
                </p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-100 shadow-sm sm:col-span-2 xl:col-span-1">
                <p className="text-[10px] sm:text-xs font-semibold uppercase text-slate-400">Prochain Cours</p>
                <p className="text-base sm:text-lg font-bold text-slate-800 mt-2">Mathématiques - 10:00</p>
                <p className="text-xs text-slate-500">Terminales A • Salle 104</p>
              </div>
            </div>

            {/* Quick Actions & Courses */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Liste des cours */}
              <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Mes Cours & Classes</h3>
                <div className="space-y-3">
                  {MOCK_COURSES.map((course) => (
                    <div
                      key={course.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 sm:p-4 rounded-lg bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-100"
                    >
                      <div>
                        <h4 className="font-bold text-slate-800">{course.name}</h4>
                        <p className="text-xs text-slate-500">
                          {course.classGroup} • {course.code}
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full w-fit">
                        {course.studentCount} élèves
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Raccourcis Rapides */}
              <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-100 shadow-sm space-y-3 sm:space-y-4">
                <h3 className="text-lg font-bold text-slate-800">Actions Rapides</h3>
                <button
                  onClick={() => setActiveTab('attendance')}
                  className="w-full text-left p-3 sm:p-4 rounded-lg bg-indigo-50 hover:bg-indigo-100/70 border border-indigo-100 transition-colors"
                >
                  <p className="font-semibold text-indigo-900 text-sm">Faire l'appel du jour</p>
                  <p className="text-xs text-indigo-600 mt-0.5">Enregistrer les présences/absences</p>
                </button>
                <button
                  onClick={() => setActiveTab('grades')}
                  className="w-full text-left p-3 sm:p-4 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <p className="font-semibold text-slate-800 text-sm">Saisir de nouvelles notes</p>
                  <p className="text-xs text-slate-500 mt-0.5">Ajouter une évaluation ou un devoir</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Notes */}
        {activeTab === 'grades' && (
          <GradeEntry
            courses={MOCK_COURSES}
            students={MOCK_STUDENTS}
            onSave={handleSaveGrades}
            onCancel={() => setActiveTab('dashboard')}
          />
        )}

        {/* Onglet Présences */}
        {activeTab === 'attendance' && (
          <AttendanceEntry
            courses={MOCK_COURSES}
            students={MOCK_STUDENTS}
            onSave={handleSaveAttendance}
            onCancel={() => setActiveTab('dashboard')}
          />
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;