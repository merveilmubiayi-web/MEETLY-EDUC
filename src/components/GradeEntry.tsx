import React, { useState } from 'react'
import type { Course, Student, GradeEntryData } from '../types/teacher'

interface GradeEntryProps {
  courses: Course[];
  students: Student[];
  onSave: (courseId: string, assessmentName: string, grades: GradeEntryData[]) => void;
  onCancel?: () => void;
}

export const GradeEntry: React.FC<GradeEntryProps> = ({
  courses,
  students,
  onSave,
  onCancel,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0]?.id || '');
  const [assessmentName, setAssessmentName] = useState<string>('');
  const [coefficient, setCoefficient] = useState<number>(1);
  const [maxGrade, setMaxGrade] = useState<number>(20);

  const [grades, setGrades] = useState<Record<string, { grade: number | ''; comments: string }>>(() =>
    students.reduce((acc, student) => {
      acc[student.id] = { grade: '', comments: '' };
      return acc;
    }, {} as Record<string, { grade: number | ''; comments: string }>)
  );

  const handleGradeChange = (studentId: string, value: string) => {
    const numVal = value === '' ? '' : Math.min(maxGrade, Math.max(0, Number(value)));
    setGrades((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], grade: numVal },
    }));
  };

  const handleCommentChange = (studentId: string, comments: string) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], comments },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !assessmentName.trim()) {
      alert('Veuillez sélectionner un cours et saisir un nom d\'évaluation.');
      return;
    }

    const payload: GradeEntryData[] = students.map((s) => ({
      studentId: s.id,
      grade: grades[s.id]?.grade ?? '',
      coefficient,
      comments: grades[s.id]?.comments || '',
    }));

    onSave(selectedCourse, assessmentName, payload);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Saisie des Notes</h2>
          <p className="text-slate-500 text-sm">Enregistrez les évaluations pour votre classe</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Configuration de l'évaluation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Cours / Classe</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500"
              required
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.classGroup})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nom de l'évaluation</label>
            <input
              type="text"
              placeholder="ex: Examen Trimestre 1"
              value={assessmentName}
              onChange={(e) => setAssessmentName(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Coefficient</label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={coefficient}
              onChange={(e) => setCoefficient(Number(e.target.value))}
              className="w-full rounded-md border border-slate-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Note Max</label>
            <input
              type="number"
              min="1"
              value={maxGrade}
              onChange={(e) => setMaxGrade(Number(e.target.value))}
              className="w-full rounded-md border border-slate-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Tableau des étudiants */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-500 uppercase bg-slate-50">
                <th className="py-3 px-4">N°</th>
                <th className="py-3 px-4">Nom complet</th>
                <th className="py-3 px-4 w-32">Note /{maxGrade}</th>
                <th className="py-3 px-4">Appréciation / Remarque</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {students.map((student, index) => (
                <tr key={student.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 text-slate-400 font-mono text-xs">{student.rollNumber || index + 1}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {student.lastName.toUpperCase()} {student.firstName}
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      step="0.25"
                      min="0"
                      max={maxGrade}
                      placeholder="--"
                      value={grades[student.id]?.grade ?? ''}
                      onChange={(e) => handleGradeChange(student.id, e.target.value)}
                      className="w-24 rounded-md border border-slate-300 p-1.5 text-center font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      placeholder="Commentaire optionnel..."
                      value={grades[student.id]?.comments || ''}
                      onChange={(e) => handleCommentChange(student.id, e.target.value)}
                      className="w-full rounded-md border border-slate-200 p-1.5 text-xs focus:ring-2 focus:ring-indigo-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Annuler
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
          >
            Enregistrer les notes
          </button>
        </div>
      </form>
    </div>
  );
};