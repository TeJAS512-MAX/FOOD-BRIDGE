import os
import re

os.chdir(r'c:\Users\bhumika\Downloads\foodbridge-uiux-design-challenge')

files = [
    r'src\components\ProblemSolutionSection.tsx',
    r'src\components\WasteToFeastVisualizer.tsx',
    r'src\components\WorkflowAndFeaturesSection.tsx',
    r'src\components\ImpactCalculatorSection.tsx',
    r'src\components\StoriesAndCtaSection.tsx',
    r'src\components\DonateModal.tsx',
    r'src\components\LiveRouteTrackerModal.tsx',
    r'src\components\PledgeMealModal.tsx',
    r'src\components\EsgCertificateModal.tsx',
    r'src\components\ActivityToastFeed.tsx',
]

replacements = [
    # Emerald light pastel -> translucent dark glass
    ('bg-emerald-50/70', 'bg-emerald-500/15 backdrop-blur-xl'),
    ('bg-emerald-50/90', 'bg-emerald-500/20 backdrop-blur-xl'),
    ('bg-emerald-50', 'bg-emerald-500/15'),
    ('bg-emerald-100', 'bg-emerald-500/20'),
    ('border-emerald-200', 'border-emerald-500/30'),
    ('border-emerald-300', 'border-emerald-500/40'),
    ('text-emerald-800', 'text-emerald-300'),
    ('text-emerald-700', 'text-emerald-400'),
    ('text-emerald-600', 'text-emerald-400'),

    # Orange light pastel -> translucent dark glass
    ('bg-orange-50/70', 'bg-orange-500/15 backdrop-blur-xl'),
    ('bg-orange-50/90', 'bg-orange-500/20 backdrop-blur-xl'),
    ('bg-orange-50', 'bg-orange-500/15'),
    ('bg-orange-100', 'bg-orange-500/20'),
    ('border-orange-200', 'border-orange-500/30'),
    ('border-orange-300', 'border-orange-500/40'),
    ('text-orange-800', 'text-orange-300'),
    ('text-orange-700', 'text-orange-400'),
    ('text-orange-600', 'text-orange-400'),

    # Rose / Red
    ('bg-rose-50', 'bg-rose-500/15'),
    ('bg-rose-100', 'bg-rose-500/20'),
    ('border-rose-200', 'border-rose-500/30'),
    ('border-rose-300', 'border-rose-500/40'),
    ('text-rose-800', 'text-rose-300'),
    ('text-rose-700', 'text-rose-400'),
    ('text-rose-600', 'text-rose-400'),
    ('text-red-700', 'text-red-400'),
    ('text-red-800', 'text-red-300'),

    # Sky / Cyan
    ('bg-sky-50/70', 'bg-cyan-500/15 backdrop-blur-xl'),
    ('bg-sky-50', 'bg-cyan-500/15'),
    ('bg-sky-100', 'bg-cyan-500/20'),
    ('border-sky-200', 'border-cyan-500/30'),
    ('border-sky-300', 'border-cyan-500/40'),
    ('text-sky-800', 'text-cyan-300'),
    ('text-sky-700', 'text-cyan-400'),
    ('text-sky-600', 'text-cyan-400'),

    # Card backgrounds: make sure cards use glassmorphic blur
    ('rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/[0.14]/90', 'glass-card'),
    ('rounded-3xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.14]/90', 'glass-card'),

    # Fix any lingering dark slate text
    ('text-slate-900', 'text-white'),
    ('text-slate-800', 'text-white/90'),
    ('text-slate-700', 'text-white/80'),
    ('text-slate-600', 'text-white/70'),
    ('text-slate-500', 'text-white/60'),
    ('text-slate-400', 'text-white/50'),

    # Active step button colors
    ('bg-white text-emerald-700', 'bg-white/10 text-emerald-300 border border-white/20'),
]

for filepath in files:
    if not os.path.exists(filepath):
        print(f'File not found: {filepath}')
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = content
    for old, new in replacements:
        modified = modified.replace(old, new)

    if modified != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(modified)
        print(f'Updated: {filepath}')
    else:
        print(f'Unchanged: {filepath}')

print('All files processed.')
