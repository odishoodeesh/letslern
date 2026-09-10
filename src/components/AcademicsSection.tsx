import React from 'react';
import { AcademicDepartment, LanguageCode } from '../types';
import { Microscope, Palette, Calculator } from 'lucide-react';
import { getT } from '../lib/translations';

interface AcademicsSectionProps {
  academicDepartments: AcademicDepartment[];
  currentLanguage?: LanguageCode;
}

const IconMap: Record<string, React.ReactNode> = {
  science: <Microscope className="w-6 h-6 text-[#2563EB]" />,
  arts: <Palette className="w-6 h-6 text-[#2563EB]" />,
  math: <Calculator className="w-6 h-6 text-[#2563EB]" />,
};

export function AcademicsSection({ academicDepartments, currentLanguage = 'en' }: AcademicsSectionProps) {
  const t = getT(currentLanguage);

  // Helper to translate default department titles and descriptions if unchanged
  const getDeptDisplay = (dep: AcademicDepartment) => {
    if (dep.id === 'science' || dep.icon === 'science') {
      return {
        name: dep.name === 'Science & Research' || dep.name.includes('Science') ? t.deptScience : dep.name,
        desc: dep.description.includes('Rigorous foundation') || dep.description.includes('biology') ? t.deptScienceDesc : dep.description
      };
    }
    if (dep.id === 'arts' || dep.icon === 'arts') {
      return {
        name: dep.name === 'Humanities & Arts' || dep.name.includes('Humanities') || dep.name.includes('Arts') ? t.deptArts : dep.name,
        desc: dep.description.includes('critical analysis') || dep.description.includes('Cultivating') ? t.deptArtsDesc : dep.description
      };
    }
    if (dep.id === 'math' || dep.icon === 'math') {
      return {
        name: dep.name === 'Mathematics & Computing' || dep.name.includes('Mathematics') || dep.name.includes('Math') ? t.deptMath : dep.name,
        desc: dep.description.includes('problem solving') || dep.description.includes('calculus') ? t.deptMathDesc : dep.description
      };
    }
    return { name: dep.name, desc: dep.description };
  };

  return (
    <section id="academics" className="py-12">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-extrabold text-[#3D4852]">{t.academicsTitle}</h2>
        <p className="text-sm text-[#6B7280] mt-1">{t.academicsSubtitle}</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        {academicDepartments.map((dep) => {
          const display = getDeptDisplay(dep);
          return (
            <div key={dep.id} className="p-6 rounded-3xl neu-card flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full neu-extruded flex items-center justify-center">
                {IconMap[dep.icon] || <Microscope className="w-6 h-6 text-[#2563EB]" />}
              </div>
              <h3 className="font-bold text-[#3D4852]">{display.name}</h3>
              <p className="text-sm text-[#6B7280]">{display.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

