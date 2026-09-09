import React from 'react';
import { AcademicDepartment } from '../types';
import { Microscope, Palette, Calculator } from 'lucide-react';

interface AcademicsSectionProps {
  academicDepartments: AcademicDepartment[];
}

const IconMap: Record<string, React.ReactNode> = {
  science: <Microscope className="w-6 h-6 text-[#2563EB]" />,
  arts: <Palette className="w-6 h-6 text-[#2563EB]" />,
  math: <Calculator className="w-6 h-6 text-[#2563EB]" />,
};

export function AcademicsSection({ academicDepartments }: AcademicsSectionProps) {
  return (
    <section id="academics" className="py-12">
      <h2 className="font-display text-2xl font-extrabold mb-8 text-[#3D4852]">Academics</h2>
      <div className="grid sm:grid-cols-3 gap-6">
        {academicDepartments.map((dep) => (
          <div key={dep.id} className="p-6 rounded-3xl neu-card flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-full neu-extruded flex items-center justify-center">
              {IconMap[dep.icon]}
            </div>
            <h3 className="font-bold text-[#3D4852]">{dep.name}</h3>
            <p className="text-sm text-[#6B7280]">{dep.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
