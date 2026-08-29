import React, { useState } from 'react'
import type { Course, Student, AttendanceRecord } from '../types/teacher'

interface AttendanceEntryProps {
  courses: Course[];
  students: Student[];
  onSave: (courseId: string, date: string, records: AttendanceRecord[]) => void;
  onCancel?: () => void;
}

export const AttendanceEntry: React.FC<AttendanceEntryProps> = ({
  courses,
  students,
  onSave,
  onCancel,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0]?.id || '');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const [records, setRecords] = useState<Record<string, AttendanceRecord>>(() =>
    students.reduce((acc, student) => {
      acc[student.id] = { studentId: student.id, status: 'present', notes: '' };
      return acc;
    }, {} as Record<string, AttendanceRecord>)
  );

  const handleStatusChange = (studentId: string, status: AttendanceRecord['status']) => {
    setRecords((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], status },
    }));
  };

  const handleNoteChange = (studentId: string, notes: string) => {
    setRecords((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], notes },
    }));
  };

  const setAllStatus = (status: AttendanceRecord['status']) => {
    setRecords((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((id) => {
        updated[id] = { ...updated[id], status };
      });
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(selectedCourse, date, Object.values(records));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Appel & Présences</h2>
          <p className="text-slate-500 text-sm">Effectuez l'appel pour la séance de cours</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Filtres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Cours / Classe</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.classGroup})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Date de la séance</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={() => setAllStatus('present')}
              className="flex-1 py-2 px-3 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors"
            >
              Tous Présents
            </button>
            <button
              type="button"
              onClick={() => setAllStatus('absent')}
              className="flex-1 py-2 px-3 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors"
            >
              Tous Absents
            </button>
          </div>
        </div>

        {/* Liste des étudiants */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-500 uppercase bg-slate-50">
                <th className="py-3 px-4">Élève</th>
                <th className="py-3 px-4 text-center">Statut</th>
                <th className="py-3 px-4">Remarque / Motif</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {students.map((student) => {
                const currentStatus = records[student.id]?.status || 'present';
                return (
                  <tr key={student.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {student.lastName.toUpperCase()} {student.firstName}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-1">
                        {(
                          [
                            { key: 'present', label: 'Présent', color: 'emerald' },
                            { key: 'absent', label: 'Absent', color: 'rose' },
                            { key: 'late', label: 'Retard', color: 'amber' },
                            { key: 'excused', label: 'Excusé', color: 'blue' },
                          ] as const
                        ).map(({ key, label, color }) => {
                          const isActive = currentStatus === key;
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => handleStatusChange(student.id, key)}
                              className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                                isActive
                                  ? `bg-${color}-600 text-white border-${color}-600 shadow-sm`
                                  : `bg-white text-slate-600 border-slate-200 hover:bg-slate-50`
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <input
                        type="text"
                        placeholder="Note ou motif..."
                        value={records[student.id]?.notes || ''}
                        onChange={(e) => handleNoteChange(student.id, e.target.value)}
                        className="w-full rounded-md border border-slate-200 p-1.5 text-xs focus:ring-2 focus:ring-indigo-500"
                      />
                    </td>
                  </tr>
                );
              })}
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
            Valider la présence
          </button>
        </div>
      </form>
    </div>
  );
};