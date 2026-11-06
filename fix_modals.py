import os

os.chdir(r'c:\Users\bhumika\Downloads\foodbridge-uiux-design-challenge')

modal_files = [
    r'src\components\DonateModal.tsx',
    r'src\components\LiveRouteTrackerModal.tsx',
    r'src\components\PledgeMealModal.tsx',
    r'src\components\EsgCertificateModal.tsx',
]

modal_replacements = [
    ('text-emerald-700', 'text-emerald-400'),
    ('text-emerald-800', 'text-emerald-300'),
    ('bg-emerald-50', 'bg-emerald-900/20'),
    ('bg-emerald-100', 'bg-emerald-900/30'),
    ('border-emerald-200', 'border-emerald-500/30'),
    ('border-emerald-300', 'border-emerald-500/40'),
    ('text-orange-700', 'text-orange-400'),
    ('text-orange-800', 'text-orange-300'),
    ('bg-orange-50', 'bg-orange-900/20'),
    ('bg-orange-100', 'bg-orange-900/30'),
    ('border-orange-200', 'border-orange-500/30'),
    # Input on dark glass
    ('bg-white border border-white', 'bg-white/10 border border-white'),
    ('bg-slate-50 border', 'bg-white/10 border'),
    # Success/error boxes
    ('bg-emerald-50 border-emerald-200', 'bg-emerald-900/20 border-emerald-500/30'),
    ('bg-red-50 border-red-200', 'bg-red-900/20 border-red-500/30'),
    ('text-red-700', 'text-red-400'),
    ('text-red-800', 'text-red-300'),
    # Amber on dark
    ('bg-amber-50', 'bg-amber-900/20'),
    ('border-amber-200', 'border-amber-500/30'),
    ('text-amber-700', 'text-amber-400'),
    ('text-amber-800', 'text-amber-300'),
    # Purple on dark
    ('bg-purple-50', 'bg-purple-900/20'),
    ('border-purple-200', 'border-purple-500/30'),
    ('text-purple-700', 'text-purple-400'),
    ('text-purple-800', 'text-purple-300'),
]

for f in modal_files:
    if not os.path.exists(f):
        continue
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    orig = content
    for old, new in modal_replacements:
        content = content.replace(old, new)
    if content != orig:
        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(content)
        print('Modal updated:', f)
    else:
        print('No changes:', f)

print('Done')
