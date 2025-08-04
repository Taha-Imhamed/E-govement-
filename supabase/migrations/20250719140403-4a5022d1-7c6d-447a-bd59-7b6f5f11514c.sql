-- Create departments table
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create citizens table
CREATE TABLE public.citizens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  national_id TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name_ar TEXT NOT NULL,
  last_name_ar TEXT NOT NULL,
  first_name_en TEXT,
  last_name_en TEXT,
  father_name_ar TEXT NOT NULL,
  mother_name_ar TEXT NOT NULL,
  father_father_name_ar TEXT,
  father_mother_name_ar TEXT,
  mother_father_name_ar TEXT,
  mother_mother_name_ar TEXT,
  birth_date DATE NOT NULL,
  birth_place_ar TEXT,
  birth_place_en TEXT,
  blood_type TEXT,
  gender TEXT CHECK (gender IN ('male', 'female')),
  marital_status TEXT CHECK (marital_status IN ('single', 'married', 'divorced', 'widowed')),
  address_ar TEXT,
  address_en TEXT,
  city_ar TEXT,
  city_en TEXT,
  phone TEXT,
  email TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  nationality_ar TEXT DEFAULT 'ليبي',
  nationality_en TEXT DEFAULT 'Libyan',
  profession_ar TEXT,
  profession_en TEXT,
  education_level_ar TEXT,
  education_level_en TEXT,
  military_service_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create government workers table
CREATE TABLE public.government_workers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name_ar TEXT NOT NULL,
  last_name_ar TEXT NOT NULL,
  first_name_en TEXT,
  last_name_en TEXT,
  department_id UUID REFERENCES public.departments(id) NOT NULL,
  position_ar TEXT,
  position_en TEXT,
  phone TEXT,
  email TEXT,
  hire_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create documents table
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  citizen_id UUID REFERENCES public.citizens(id) ON DELETE CASCADE NOT NULL,
  document_type TEXT NOT NULL,
  document_number TEXT,
  issue_date DATE,
  expiry_date DATE,
  issuing_authority_ar TEXT,
  issuing_authority_en TEXT,
  status TEXT CHECK (status IN ('active', 'expired', 'suspended', 'cancelled')) DEFAULT 'active',
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.citizens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

-- Create policies for citizens (they can only see their own data)
CREATE POLICY "Citizens can view their own data" 
ON public.citizens 
FOR SELECT 
USING (national_id = current_setting('app.current_citizen_id', true));

-- Create policies for government workers (they can view all citizens in their department scope)
CREATE POLICY "Government workers can view all citizens" 
ON public.citizens 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.government_workers 
  WHERE employee_id = current_setting('app.current_worker_id', true) 
  AND is_active = true
));

-- Create policies for documents
CREATE POLICY "Citizens can view their own documents" 
ON public.documents 
FOR SELECT 
USING (citizen_id IN (
  SELECT id FROM public.citizens 
  WHERE national_id = current_setting('app.current_citizen_id', true)
));

CREATE POLICY "Government workers can view all documents" 
ON public.documents 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.government_workers 
  WHERE employee_id = current_setting('app.current_worker_id', true) 
  AND is_active = true
));

-- Create policies for government workers
CREATE POLICY "Workers can view all workers" 
ON public.government_workers 
FOR SELECT 
USING (true);

-- Create policies for departments  
CREATE POLICY "Anyone can view departments" 
ON public.departments 
FOR SELECT 
USING (true);

-- Insert departments
INSERT INTO public.departments (name_ar, name_en, code) VALUES
('الشرطة', 'Police', 'POLICE'),
('السجل المدني', 'Civil Records', 'CIVIL'),
('الجوازات', 'Passports', 'PASSPORT'),
('الإسكان', 'Housing', 'HOUSING'),
('الصحة', 'Health', 'HEALTH');

-- Insert sample citizens (using bcrypt-like hash for password)
INSERT INTO public.citizens (
  national_id, password_hash, first_name_ar, last_name_ar, first_name_en, last_name_en,
  father_name_ar, mother_name_ar, father_father_name_ar, father_mother_name_ar,
  mother_father_name_ar, mother_mother_name_ar, birth_date, birth_place_ar, birth_place_en,
  blood_type, gender, marital_status, address_ar, address_en, city_ar, city_en,
  phone, email, emergency_contact_name, emergency_contact_phone, profession_ar, profession_en,
  education_level_ar, education_level_en, military_service_status
) VALUES
(
  '1234567890123', '$2b$10$dummy_hash_citizen123', 'أحمد', 'الصالح', 'Ahmed', 'Al-Saleh',
  'محمد', 'فاطمة', 'علي', 'عائشة', 'حسن', 'خديجة', '1985-03-15', 'طرابلس', 'Tripoli',
  'O+', 'male', 'married', 'شارع الجمهورية، طرابلس', 'Republic Street, Tripoli', 'طرابلس', 'Tripoli',
  '0912345678', 'ahmed.saleh@email.ly', 'زينب الصالح', '0923456789', 'مهندس', 'Engineer',
  'بكالوريوس هندسة', 'Bachelor of Engineering', 'مكتمل'
),
(
  '9876543210987', '$2b$10$dummy_hash_ahmad456', 'سارة', 'النوري', 'Sara', 'Al-Nouri',
  'يوسف', 'مريم', 'أحمد', 'فاطمة', 'محمود', 'زينب', '1990-07-22', 'بنغازي', 'Benghazi',
  'A+', 'female', 'single', 'شارع عمر المختار، بنغازي', 'Omar Al-Mukhtar Street, Benghazi', 'بنغازي', 'Benghazi',
  '0913456789', 'sara.nouri@email.ly', 'مريم النوري', '0924567890', 'طبيبة', 'Doctor',
  'دكتوراه في الطب', 'Doctor of Medicine', 'غير مطلوب'
),
(
  '5555666677778', '$2b$10$dummy_hash_omar789', 'عمر', 'الزروق', 'Omar', 'Al-Zarouq',
  'سالم', 'نعيمة', 'محمد', 'حليمة', 'إبراهيم', 'رقية', '1978-12-10', 'مصراتة', 'Misrata',
  'B+', 'male', 'married', 'حي الضواحي، مصراتة', 'Suburbs District, Misrata', 'مصراتة', 'Misrata',
  '0914567890', 'omar.zarouq@email.ly', 'ليلى الزروق', '0925678901', 'محاسب', 'Accountant',
  'بكالوريوس محاسبة', 'Bachelor of Accounting', 'مكتمل'
),
(
  '1111222233334', '$2b$10$dummy_hash_layla101', 'ليلى', 'القاضي', 'Layla', 'Al-Qadi',
  'محمود', 'سعاد', 'عبدالله', 'آمنة', 'عمر', 'خديجة', '1995-05-18', 'سبها', 'Sabha',
  'AB+', 'female', 'married', 'المدينة القديمة، سبها', 'Old City, Sabha', 'سبها', 'Sabha',
  '0915678901', 'layla.qadi@email.ly', 'سعاد القاضي', '0926789012', 'معلمة', 'Teacher',
  'بكالوريوس تربية', 'Bachelor of Education', 'غير مطلوب'
),
(
  '7777888899990', '$2b$10$dummy_hash_hassan202', 'حسن', 'المبروك', 'Hassan', 'Al-Mabrouk',
  'علي', 'زهرة', 'حسين', 'فضيلة', 'مصطفى', 'نورا', '1982-09-03', 'الزاوية', 'Zawiya',
  'O-', 'male', 'divorced', 'شارع الشهداء، الزاوية', 'Martyrs Street, Zawiya', 'الزاوية', 'Zawiya',
  '0916789012', 'hassan.mabrouk@email.ly', 'علي المبروك', '0927890123', 'سائق', 'Driver',
  'ثانوية عامة', 'High School', 'مكتمل'
);

-- Insert sample government workers
INSERT INTO public.government_workers (
  employee_id, password_hash, first_name_ar, last_name_ar, first_name_en, last_name_en,
  department_id, position_ar, position_en, phone, email, hire_date
) VALUES
-- Police Department
('EMP001', '$2b$10$dummy_hash_police123', 'محمد', 'الأمين', 'Mohamed', 'Al-Amin', 
 (SELECT id FROM public.departments WHERE code = 'POLICE'), 'ضابط شرطة', 'Police Officer', '0911111111', 'mohamed.amin@police.ly', '2020-01-15'),
('EMP002', '$2b$10$dummy_hash_police456', 'أمينة', 'السعدي', 'Amina', 'Al-Saadi', 
 (SELECT id FROM public.departments WHERE code = 'POLICE'), 'ضابط شرطة', 'Police Officer', '0911111112', 'amina.saadi@police.ly', '2019-03-20'),
('EMP003', '$2b$10$dummy_hash_police789', 'خالد', 'النجار', 'Khalid', 'Al-Najjar', 
 (SELECT id FROM public.departments WHERE code = 'POLICE'), 'مفتش شرطة', 'Police Inspector', '0911111113', 'khalid.najjar@police.ly', '2018-06-10'),
('EMP004', '$2b$10$dummy_hash_police101', 'نور', 'الهداية', 'Nour', 'Al-Hidaya', 
 (SELECT id FROM public.departments WHERE code = 'POLICE'), 'ضابط شرطة', 'Police Officer', '0911111114', 'nour.hidaya@police.ly', '2021-02-28'),
('EMP005', '$2b$10$dummy_hash_police202', 'سامي', 'القريشي', 'Sami', 'Al-Quraishi', 
 (SELECT id FROM public.departments WHERE code = 'POLICE'), 'رقيب شرطة', 'Police Sergeant', '0911111115', 'sami.quraishi@police.ly', '2017-11-05'),

-- Civil Records Department  
('EMP006', '$2b$10$dummy_hash_civil123', 'فادية', 'المهدي', 'Fadia', 'Al-Mahdi', 
 (SELECT id FROM public.departments WHERE code = 'CIVIL'), 'موظف سجل مدني', 'Civil Records Officer', '0911111116', 'fadia.mahdi@civil.ly', '2019-08-12'),
('EMP007', '$2b$10$dummy_hash_civil456', 'عبدالرحمن', 'التركي', 'Abdulrahman', 'Al-Turki', 
 (SELECT id FROM public.departments WHERE code = 'CIVIL'), 'رئيس قسم', 'Department Head', '0911111117', 'abdulrahman.turki@civil.ly', '2016-04-03'),
('EMP008', '$2b$10$dummy_hash_civil789', 'سلمى', 'الفيتوري', 'Salma', 'Al-Faituri', 
 (SELECT id FROM public.departments WHERE code = 'CIVIL'), 'موظف سجل مدني', 'Civil Records Officer', '0911111118', 'salma.faituri@civil.ly', '2020-07-19'),
('EMP009', '$2b$10$dummy_hash_civil101', 'طارق', 'البوعيشي', 'Tarek', 'Al-Buaishi', 
 (SELECT id FROM public.departments WHERE code = 'CIVIL'), 'موظف سجل مدني', 'Civil Records Officer', '0911111119', 'tarek.buaishi@civil.ly', '2018-12-14'),
('EMP010', '$2b$10$dummy_hash_civil202', 'ريم', 'الشكري', 'Reem', 'Al-Shukri', 
 (SELECT id FROM public.departments WHERE code = 'CIVIL'), 'مراجع وثائق', 'Document Reviewer', '0911111120', 'reem.shukri@civil.ly', '2021-09-25'),

-- Passports Department
('EMP011', '$2b$10$dummy_hash_passport123', 'مراد', 'الكوني', 'Murad', 'Al-Koni', 
 (SELECT id FROM public.departments WHERE code = 'PASSPORT'), 'موظف جوازات', 'Passport Officer', '0911111121', 'murad.koni@passport.ly', '2017-05-30'),
('EMP012', '$2b$10$dummy_hash_passport456', 'هدى', 'الورفلي', 'Huda', 'Al-Warfalli', 
 (SELECT id FROM public.departments WHERE code = 'PASSPORT'), 'موظف جوازات', 'Passport Officer', '0911111122', 'huda.warfalli@passport.ly', '2019-10-08'),
('EMP013', '$2b$10$dummy_hash_passport789', 'يوسف', 'الغرياني', 'Yussef', 'Al-Gharyani', 
 (SELECT id FROM public.departments WHERE code = 'PASSPORT'), 'رئيس قسم', 'Department Head', '0911111123', 'yussef.gharyani@passport.ly', '2015-02-14'),
('EMP014', '$2b$10$dummy_hash_passport101', 'إيمان', 'الحصادي', 'Iman', 'Al-Hasadi', 
 (SELECT id FROM public.departments WHERE code = 'PASSPORT'), 'موظف جوازات', 'Passport Officer', '0911111124', 'iman.hasadi@passport.ly', '2020-11-22'),
('EMP015', '$2b$10$dummy_hash_passport202', 'عادل', 'المشاي', 'Adel', 'Al-Mashai', 
 (SELECT id FROM public.departments WHERE code = 'PASSPORT'), 'موظف جوازات', 'Passport Officer', '0911111125', 'adel.mashai@passport.ly', '2018-08-17'),

-- Housing Department
('EMP016', '$2b$10$dummy_hash_housing123', 'وفاء', 'الدرسي', 'Wafa', 'Al-Darsi', 
 (SELECT id FROM public.departments WHERE code = 'HOUSING'), 'موظف إسكان', 'Housing Officer', '0911111126', 'wafa.darsi@housing.ly', '2019-03-11'),
('EMP017', '$2b$10$dummy_hash_housing456', 'صلاح', 'الكيلاني', 'Salah', 'Al-Kilani', 
 (SELECT id FROM public.departments WHERE code = 'HOUSING'), 'مهندس معماري', 'Architect', '0911111127', 'salah.kilani@housing.ly', '2016-07-26'),
('EMP018', '$2b$10$dummy_hash_housing789', 'نادية', 'العباني', 'Nadia', 'Al-Abbani', 
 (SELECT id FROM public.departments WHERE code = 'HOUSING'), 'موظف إسكان', 'Housing Officer', '0911111128', 'nadia.abbani@housing.ly', '2020-04-09'),
('EMP019', '$2b$10$dummy_hash_housing101', 'أشرف', 'المجبري', 'Ashraf', 'Al-Majbari', 
 (SELECT id FROM public.departments WHERE code = 'HOUSING'), 'رئيس قسم', 'Department Head', '0911111129', 'ashraf.majbari@housing.ly', '2014-12-01'),
('EMP020', '$2b$10$dummy_hash_housing202', 'مايسة', 'الطلحي', 'Maysa', 'Al-Talhi', 
 (SELECT id FROM public.departments WHERE code = 'HOUSING'), 'موظف إسكان', 'Housing Officer', '0911111130', 'maysa.talhi@housing.ly', '2021-06-18'),

-- Health Department
('EMP021', '$2b$10$dummy_hash_health123', 'د. أمجد', 'الشريف', 'Dr. Amjad', 'Al-Sharif', 
 (SELECT id FROM public.departments WHERE code = 'HEALTH'), 'طبيب', 'Doctor', '0911111131', 'amjad.sharif@health.ly', '2017-09-04'),
('EMP022', '$2b$10$dummy_hash_health456', 'منى', 'البدوي', 'Mona', 'Al-Badawi', 
 (SELECT id FROM public.departments WHERE code = 'HEALTH'), 'ممرضة', 'Nurse', '0911111132', 'mona.badawi@health.ly', '2018-01-22'),
('EMP023', '$2b$10$dummy_hash_health789', 'د. محمود', 'العجيلي', 'Dr. Mahmoud', 'Al-Ajili', 
 (SELECT id FROM public.departments WHERE code = 'HEALTH'), 'استشاري', 'Consultant', '0911111133', 'mahmoud.ajili@health.ly', '2013-10-15'),
('EMP024', '$2b$10$dummy_hash_health101', 'سمر', 'الحويج', 'Samar', 'Al-Huwaij', 
 (SELECT id FROM public.departments WHERE code = 'HEALTH'), 'إداري صحي', 'Health Administrator', '0911111134', 'samar.huwaij@health.ly', '2019-12-07'),
('EMP025', '$2b$10$dummy_hash_health202', 'بسام', 'الماجري', 'Bassam', 'Al-Majri', 
 (SELECT id FROM public.departments WHERE code = 'HEALTH'), 'فني مختبر', 'Lab Technician', '0911111135', 'bassam.majri@health.ly', '2020-05-13');

-- Insert sample documents for citizens
INSERT INTO public.documents (citizen_id, document_type, document_number, issue_date, expiry_date, issuing_authority_ar, issuing_authority_en, status) VALUES
-- Documents for Ahmed Al-Saleh (1234567890123)
((SELECT id FROM public.citizens WHERE national_id = '1234567890123'), 'passport', 'P123456789', '2020-01-15', '2030-01-15', 'مصلحة الجوازات الليبية', 'Libyan Passport Authority', 'active'),
((SELECT id FROM public.citizens WHERE national_id = '1234567890123'), 'driving_license', 'DL987654321', '2019-06-20', '2029-06-20', 'إدارة المرور الليبية', 'Libyan Traffic Department', 'active'),
((SELECT id FROM public.citizens WHERE national_id = '1234567890123'), 'birth_certificate', 'BC1234567890123', '1985-03-15', NULL, 'مصلحة السجل المدني', 'Civil Registry Office', 'active'),

-- Documents for Sara Al-Nouri (9876543210987)
((SELECT id FROM public.citizens WHERE national_id = '9876543210987'), 'passport', 'P987654321', '2021-03-10', '2031-03-10', 'مصلحة الجوازات الليبية', 'Libyan Passport Authority', 'active'),
((SELECT id FROM public.citizens WHERE national_id = '9876543210987'), 'birth_certificate', 'BC9876543210987', '1990-07-22', NULL, 'مصلحة السجل المدني', 'Civil Registry Office', 'active'),
((SELECT id FROM public.citizens WHERE national_id = '9876543210987'), 'medical_license', 'ML456789123', '2018-09-15', '2028-09-15', 'وزارة الصحة الليبية', 'Libyan Ministry of Health', 'active'),

-- Documents for Omar Al-Zarouq (5555666677778)
((SELECT id FROM public.citizens WHERE national_id = '5555666677778'), 'passport', 'P555666777', '2019-11-05', '2029-11-05', 'مصلحة الجوازات الليبية', 'Libyan Passport Authority', 'active'),
((SELECT id FROM public.citizens WHERE national_id = '5555666677778'), 'driving_license', 'DL555666777', '2018-04-12', '2028-04-12', 'إدارة المرور الليبية', 'Libyan Traffic Department', 'active'),
((SELECT id FROM public.citizens WHERE national_id = '5555666677778'), 'birth_certificate', 'BC5555666677778', '1978-12-10', NULL, 'مصلحة السجل المدني', 'Civil Registry Office', 'active'),

-- Documents for Layla Al-Qadi (1111222233334)  
((SELECT id FROM public.citizens WHERE national_id = '1111222233334'), 'passport', 'P111222333', '2022-02-28', '2032-02-28', 'مصلحة الجوازات الليبية', 'Libyan Passport Authority', 'active'),
((SELECT id FROM public.citizens WHERE national_id = '1111222233334'), 'birth_certificate', 'BC1111222233334', '1995-05-18', NULL, 'مصلحة السجل المدني', 'Civil Registry Office', 'active'),
((SELECT id FROM public.citizens WHERE national_id = '1111222233334'), 'teaching_license', 'TL789123456', '2020-08-30', '2030-08-30', 'وزارة التربية والتعليم', 'Ministry of Education', 'active'),

-- Documents for Hassan Al-Mabrouk (7777888899990)
((SELECT id FROM public.citizens WHERE national_id = '7777888899990'), 'passport', 'P777888999', '2020-12-18', '2030-12-18', 'مصلحة الجوازات الليبية', 'Libyan Passport Authority', 'active'),
((SELECT id FROM public.citizens WHERE national_id = '7777888899990'), 'driving_license', 'DL777888999', '2017-07-25', '2027-07-25', 'إدارة المرور الليبية', 'Libyan Traffic Department', 'active'),
((SELECT id FROM public.citizens WHERE national_id = '7777888899990'), 'birth_certificate', 'BC7777888899990', '1982-09-03', NULL, 'مصلحة السجل المدني', 'Civil Registry Office', 'active');

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_citizens_updated_at
    BEFORE UPDATE ON public.citizens
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_government_workers_updated_at
    BEFORE UPDATE ON public.government_workers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON public.documents
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();