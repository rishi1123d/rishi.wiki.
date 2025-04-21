// Simple JavaScript functionality for the website

document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect for the header
    const header = document.querySelector('h1');
    const originalText = header.textContent;
    header.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            header.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, Math.random() * 70 + 40); // Random delay for more realistic typing
        }
    }
    
    // Start the typewriter effect
    setTimeout(typeWriter, 300);
    
    // Simple fade-in animation for sections
    const sections = document.querySelectorAll('section');
    
    // Add fade-in class to all sections
    sections.forEach((section, index) => {
        section.classList.add('fade-in');
        // Stagger the animations
        setTimeout(() => {
            section.classList.add('visible');
        }, 300 + (index * 150));
    });
});

// Add CSS for the fade-in animation to the existing stylesheet
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(5px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// List of languages with their codes
const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'es', name: 'Spanish', native: 'Español' },
    { code: 'fr', name: 'French', native: 'Français' },
    { code: 'de', name: 'German', native: 'Deutsch' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'zh', name: 'Chinese (Simplified)', native: '简体中文' },
    { code: 'zh-tw', name: 'Chinese (Traditional)', native: '繁體中文' },
    { code: 'ar', name: 'Arabic', native: 'العربية' },
    { code: 'ko', name: 'Korean', native: '한국어' },
    { code: 'ja', name: 'Japanese', native: '日本語' }
];

// Initialize language menu
document.addEventListener('DOMContentLoaded', () => {
    const languageList = document.querySelector('.language-list');
    languages.forEach(lang => {
        const div = document.createElement('div');
        div.className = 'language-item';
        div.innerHTML = `
            <span>${lang.name}</span>
            <span>${lang.native}</span>
        `;
        div.onclick = () => changeLanguage(lang.code);
        languageList.appendChild(div);
    });
});

// Toggle language menu
function toggleLanguageMenu(event) {
    event.preventDefault();
    const menu = document.getElementById('language-menu');
    menu.classList.toggle('show');
    
    // Close menu when clicking outside
    document.addEventListener('click', function closeMenu(e) {
        if (!menu.contains(e.target) && !e.target.closest('.language-selector')) {
            menu.classList.remove('show');
            document.removeEventListener('click', closeMenu);
        }
    });
}

// Filter languages
function filterLanguages(query) {
    const items = document.querySelectorAll('.language-item');
    query = query.toLowerCase();
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
    });
}

// Change language
function changeLanguage(langCode) {
    const translation = translations[langCode];
    if (!translation) return;

    // Update page title
    document.title = `${translation.title} - Wikipedia`;

    // Update main content
    document.querySelector('.main-content h1').textContent = translation.title;
    
    // Update intro paragraphs
    const paragraphs = document.querySelector('.main-content').getElementsByTagName('p');
    paragraphs[0].innerHTML = translation.intro + ' <a href="https://scholar.google.com/citations?user=FZc7hOoAAAAJ&hl=en" target="_blank">research</a>';
    paragraphs[1].textContent = translation.interests;

    // Update sections
    document.querySelector('#current h3').textContent = translation.current_work;
    document.querySelector('#previous h3').textContent = translation.previous_work;
    document.querySelector('#thinking h3').textContent = translation.looking_at;
    document.querySelector('#contact h3').textContent = translation.contact;

    // Update current work section
    const currentWork = document.querySelector('#current');
    const currentParagraphs = currentWork.getElementsByTagName('p');
    currentParagraphs[0].textContent = translation.building;
    currentParagraphs[1].innerHTML = `${translation.ai_work} <a href="https://recallrai.com/" target="_blank">RecallRAI</a>`;
    currentParagraphs[2].innerHTML = `${translation.college_dao} <a href="https://collegedao.io/" target="_blank">collegedao</a>`;
    currentParagraphs[3].textContent = translation.conference;

    // Update previous work section
    const previousWork = document.querySelector('#previous');
    const prevParagraphs = previousWork.getElementsByTagName('p');
    prevParagraphs[0].innerHTML = `${translation.stride_founder} <a href="https://www.stride-labs.com/" target="_blank">stride labs</a>`;
    const strideDesc = previousWork.querySelectorAll('.indent p');
    strideDesc[0].textContent = translation.stride_desc1;
    strideDesc[1].textContent = translation.stride_desc2;
    strideDesc[2].textContent = translation.stride_desc3;

    prevParagraphs[4].innerHTML = `${translation.nextgen_role} <a href="https://ngresearch.org/" target="_blank">nextgenri</a>`;
    const nextgenDesc = previousWork.querySelectorAll('.indent')[1].getElementsByTagName('p');
    nextgenDesc[0].textContent = translation.nextgen_desc1;
    nextgenDesc[1].textContent = translation.nextgen_desc2;
    nextgenDesc[2].textContent = translation.nextgen_desc3;
    nextgenDesc[3].textContent = translation.nextgen_desc4;

    // Update looking at section
    const lookingAt = document.querySelector('#thinking').getElementsByTagName('p');
    lookingAt[0].textContent = translation.interests1;
    lookingAt[1].textContent = translation.interests2;
    lookingAt[2].textContent = translation.interests3;

    // Update info box content
    const infoLabels = document.querySelectorAll('.info-label');
    infoLabels.forEach(label => {
        const key = label.textContent.toLowerCase().replace(' ', '_');
        if (translation[key]) {
            label.textContent = translation[key];
        }
    });

    // Update info box values
    const infoRows = document.querySelectorAll('.info-row');
    infoRows.forEach(row => {
        const label = row.querySelector('.info-label').textContent.toLowerCase().replace(' ', '_');
        const value = row.querySelector('span:last-child');
        if (label === 'education') {
            value.textContent = translation.high_school;
        } else if (label === 'occupation') {
            value.textContent = translation.entrepreneur;
        } else if (label === 'known_for') {
            value.textContent = translation.known_fields;
        }
    });

    // Close the language menu
    document.getElementById('language-menu').classList.remove('show');
}

// Translations
const translations = {
    'en': {
        'title': 'Rishi Kanaparti',
        'intro': 'i build things. involved in startups, blockchain and research',
        'interests': 'in my free time i like to hit the gym, hike, rock climb, meet cool people and read',
        'current_work': 'Current Work',
        'building': 'building & shipping cool stuff',
        'ai_work': 'working on solving ai hallucinations at',
        'college_dao': 'leading research development and liquid fund at',
        'conference': 'working on organizing the biggest student blockchain conference of the year in december',
        'previous_work': 'Previous Work',
        'stride_founder': 'co founder @',
        'stride_desc1': 'made custom orthothic insoles in one click instead of taking up to 4 hours per insole design',
        'stride_desc2': 'with own proprietary patent pending ai model',
        'stride_desc3': 'worked with two of the biggest O&P manufacturers in the USA',
        'nextgen_role': 'coo @',
        'nextgen_desc1': 'made research accessible to high schoolers by offering affordable mentorship and publishing support',
        'nextgen_desc2': 'ran a highschool journal',
        'nextgen_desc3': '5 figures revenue',
        'nextgen_desc4': '1000+ students applied',
        'looking_at': 'Looking At',
        'interests1': 'ai agents',
        'interests2': 'the future web2/web3',
        'interests3': 'biotech',
        'contact': 'contact me :)',
        'born': 'Born',
        'based_in': 'Based in',
        'education': 'Education',
        'occupation': 'Occupation',
        'known_for': 'Known for',
        'high_school': 'High school',
        'entrepreneur': 'Entrepreneur, Researcher',
        'known_fields': 'AI, Blockchain Technology'
    },
    'es': {
        'title': 'Rishi Kanaparti',
        'intro': 'construyo cosas. involucrado en startups, blockchain e investigación',
        'interests': 'en mi tiempo libre me gusta ir al gimnasio, hacer senderismo, escalar, conocer gente interesante y leer',
        'current_work': 'Trabajo Actual',
        'building': 'construyendo y lanzando cosas increíbles',
        'ai_work': 'trabajando en resolver alucinaciones de IA en RecallRAI',
        'college_dao': 'dirigiendo el desarrollo de investigación y fondo líquido en collegedao',
        'conference': 'organizando la conferencia de blockchain estudiantil más grande del año en diciembre',
        'previous_work': 'Trabajo Anterior',
        'stride_founder': 'cofundador @ stride labs',
        'stride_desc1': 'creación de plantillas ortopédicas personalizadas con un clic en lugar de tomar hasta 4 horas por diseño',
        'stride_desc2': 'con modelo de IA patentado propio pendiente',
        'stride_desc3': 'trabajó con dos de los mayores fabricantes de O&P en EE. UU.',
        'nextgen_role': 'director de operaciones @ nextgenri',
        'nextgen_desc1': 'hizo la investigación accesible para estudiantes de secundaria ofreciendo tutoría y apoyo de publicación asequibles',
        'nextgen_desc2': 'dirigió una revista de secundaria',
        'nextgen_desc3': 'ingresos de 5 cifras',
        'nextgen_desc4': '1000+ estudiantes aplicaron',
        'looking_at': 'Explorando',
        'interests1': 'agentes de IA',
        'interests2': 'el futuro web2/web3',
        'interests3': 'biotecnología',
        'contact': 'contáctame :)',
        'born': 'Nacimiento',
        'based_in': 'Ubicación',
        'education': 'Educación',
        'occupation': 'Ocupación',
        'known_for': 'Conocido por',
        'high_school': 'Escuela secundaria',
        'entrepreneur': 'Emprendedor, Investigador',
        'known_fields': 'IA, Tecnología Blockchain'
    },
    'fr': {
        'title': 'Rishi Kanaparti',
        'intro': 'je construis des choses. impliqué dans les startups, la blockchain et la recherche',
        'interests': 'dans mon temps libre, j\'aime aller à la salle de sport, faire de la randonnée, de l\'escalade, rencontrer des gens cool et lire',
        'current_work': 'Travail Actuel',
        'building': 'construction et lancement de projets cool',
        'ai_work': 'travaille sur la résolution des hallucinations d\'IA chez RecallRAI',
        'college_dao': 'direction du développement de la recherche et du fonds liquide chez collegedao',
        'conference': 'organisation de la plus grande conférence étudiante sur la blockchain de l\'année en décembre',
        'previous_work': 'Expérience Précédente',
        'stride_founder': 'co-fondateur @ stride labs',
        'stride_desc1': 'création de semelles orthopédiques personnalisées en un clic au lieu de prendre jusqu\'à 4 heures par conception',
        'stride_desc2': 'avec notre propre modèle d\'IA en instance de brevet',
        'stride_desc3': 'a travaillé avec deux des plus grands fabricants d\'O&P aux États-Unis',
        'nextgen_role': 'directeur des opérations @ nextgenri',
        'nextgen_desc1': 'a rendu la recherche accessible aux lycéens en offrant du mentorat et un soutien à la publication abordables',
        'nextgen_desc2': 'a dirigé un journal lycéen',
        'nextgen_desc3': 'revenus à 5 chiffres',
        'nextgen_desc4': '1000+ étudiants ont postulé',
        'looking_at': 'Je M\'intéresse À',
        'interests1': 'agents d\'IA',
        'interests2': 'l\'avenir du web2/web3',
        'interests3': 'biotechnologie',
        'contact': 'contactez-moi :)',
        'born': 'Né',
        'based_in': 'Basé à',
        'education': 'Formation',
        'occupation': 'Profession',
        'known_for': 'Connu pour',
        'high_school': 'Lycée',
        'entrepreneur': 'Entrepreneur, Chercheur',
        'known_fields': 'IA, Technologie Blockchain'
    },
    'de': {
        'title': 'Rishi Kanaparti',
        'intro': 'ich baue Dinge. beteiligt an Startups, Blockchain und Forschung',
        'interests': 'in meiner Freizeit gehe ich gerne ins Fitnessstudio, wandern, klettern, treffe interessante Menschen und lese',
        'current_work': 'Aktuelle Arbeit',
        'building': 'baue und liefere coole Sachen',
        'ai_work': 'arbeite an der Lösung von KI-Halluzinationen bei RecallRAI',
        'college_dao': 'leite Forschungsentwicklung und Liquid Fund bei collegedao',
        'conference': 'organisiere die größte studentische Blockchain-Konferenz des Jahres im Dezember',
        'previous_work': 'Frühere Arbeit',
        'stride_founder': 'Mitgründer @ stride labs',
        'stride_desc1': 'Erstellung maßgeschneiderter orthopädischer Einlagen mit einem Klick statt bis zu 4 Stunden pro Design',
        'stride_desc2': 'mit eigenem zum Patent angemeldetem KI-Modell',
        'stride_desc3': 'arbeitete mit zwei der größten O&P-Hersteller in den USA',
        'nextgen_role': 'COO @ nextgenri',
        'nextgen_desc1': 'machte Forschung für Schüler durch erschwingliches Mentoring und Publikationsunterstützung zugänglich',
        'nextgen_desc2': 'leitete eine Schülerzeitung',
        'nextgen_desc3': '5-stelliger Umsatz',
        'nextgen_desc4': '1000+ Schüler bewarben sich',
        'looking_at': 'Interessengebiete',
        'interests1': 'KI-Agenten',
        'interests2': 'die Zukunft von Web2/Web3',
        'interests3': 'Biotechnologie',
        'contact': 'kontaktiere mich :)',
        'born': 'Geboren',
        'based_in': 'Ansässig in',
        'education': 'Ausbildung',
        'occupation': 'Beruf',
        'known_for': 'Bekannt für',
        'high_school': 'Gymnasium',
        'entrepreneur': 'Unternehmer, Forscher',
        'known_fields': 'KI, Blockchain-Technologie'
    },
    'hi': {
        'title': 'ऋषि कनपर्ति',
        'intro': 'मैं चीजें बनाता हूं। स्टार्टअप्स, ब्लॉकचेन और रिसर्च में शामिल',
        'interests': 'खाली समय में मैं जिम जाना, हाइकिंग, रॉक क्लाइम्बिंग, लोगों से मिलना और पढ़ना पसंद करता हूं',
        'current_work': 'वर्तमान कार्य',
        'building': 'कूल चीजें बना और लॉन्च कर रहा हूं',
        'ai_work': 'RecallRAI में AI हैलुसिनेशन्स को सुलझाने पर काम कर रहा हूं',
        'college_dao': 'collegedao में रिसर्च डेवलपमेंट और लिक्विड फंड का नेतृत्व कर रहा हूं',
        'conference': 'दिसंबर में साल की सबसे बड़ी स्टूडेंट ब्लॉकचेन कॉन्फ्रेंस का आयोजन कर रहा हूं',
        'previous_work': 'पिछला काम',
        'stride_founder': 'सह-संस्थापक @ stride labs',
        'stride_desc1': 'कस्टम ऑर्थोटिक इनसोल को एक क्लिक में बनाना जो पहले 4 घंटे तक लेता था',
        'stride_desc2': 'खुद का पेटेंट लंबित AI मॉडल',
        'stride_desc3': 'USA के दो सबसे बड़े O&P निर्माताओं के साथ काम किया',
        'nextgen_role': 'सीओओ @ nextgenri',
        'nextgen_desc1': 'हाई स्कूल के छात्रों के लिए सस्ती मेंटरशिप और पब्लिशिंग सपोर्ट के माध्यम से रिसर्च को सुलभ बनाया',
        'nextgen_desc2': 'एक हाई स्कूल जर्नल चलाया',
        'nextgen_desc3': '5 अंकों का राजस्व',
        'nextgen_desc4': '1000+ छात्रों ने आवेदन किया',
        'looking_at': 'देख रहा हूं',
        'interests1': 'AI एजेंट्स',
        'interests2': 'web2/web3 का भविष्य',
        'interests3': 'बायोटेक',
        'contact': 'संपर्क करें :)',
        'born': 'जन्म',
        'based_in': 'निवास स्थान',
        'education': 'शिक्षा',
        'occupation': 'व्यवसाय',
        'known_for': 'इनके लिए जाने जाते हैं',
        'high_school': 'हाई स्कूल',
        'entrepreneur': 'उद्यमी, शोधकर्ता',
        'known_fields': 'AI, ब्लॉकचेन टेक्नॉलॉजी'
    },
    'zh': {
        'title': 'Rishi Kanaparti',
        'intro': '我创造事物。参与创业、区块链和研究',
        'interests': '空闲时间我喜欢去健身房、徒步旅行、攀岩、认识有趣的人和阅读',
        'current_work': '当前工作',
        'building': '构建和发布很酷的东西',
        'ai_work': '在 RecallRAI 解决 AI 幻觉问题',
        'college_dao': '在 collegedao 领导研究开发和流动基金',
        'conference': '组织今年十二月最大的学生区块链会议',
        'previous_work': '以往工作',
        'stride_founder': '联合创始人 @ stride labs',
        'stride_desc1': '一键制作定制矫形鞋垫，而不是每个设计需要4小时',
        'stride_desc2': '使用我们自己的专利待审 AI 模型',
        'stride_desc3': '与美国最大的两家 O&P 制造商合作',
        'nextgen_role': '首席运营官 @ nextgenri',
        'nextgen_desc1': '通过提供负担得起的指导和出版支持，使高中生能够进行研究',
        'nextgen_desc2': '运营高中期刊',
        'nextgen_desc3': '五位数的收入',
        'nextgen_desc4': '1000+ 学生申请',
        'looking_at': '关注领域',
        'interests1': 'AI 代理',
        'interests2': 'web2/web3 的未来',
        'interests3': '生物技术',
        'contact': '联系我 :)',
        'born': '出生',
        'based_in': '居住地',
        'education': '教育',
        'occupation': '职业',
        'known_for': '知名领域',
        'high_school': '高中',
        'entrepreneur': '企业家、研究员',
        'known_fields': 'AI、区块链技术'
    },
    'zh-tw': {
        'title': 'Rishi Kanaparti',
        'intro': '我創造事物。參與創業、區塊鏈和研究',
        'interests': '空閒時間我喜歡去健身房、徒步旅行、攀岩、認識有趣的人和閱讀',
        'current_work': '當前工作',
        'building': '構建和發布很酷的東西',
        'ai_work': '在 RecallRAI 解決 AI 幻覺問題',
        'college_dao': '在 collegedao 領導研究開發和流動基金',
        'conference': '組織今年十二月最大的學生區塊鏈會議',
        'previous_work': '以往工作',
        'stride_founder': '聯合創始人 @ stride labs',
        'stride_desc1': '一鍵製作定制矯正鞋墊，而不是每個設計需要4小時',
        'stride_desc2': '使用我們自己的專利待審 AI 模型',
        'stride_desc3': '與美國最大的兩家 O&P 製造商合作',
        'nextgen_role': '首席運營官 @ nextgenri',
        'nextgen_desc1': '通過提供負擔得起的指導和出版支持，使高中生能夠進行研究',
        'nextgen_desc2': '運營高中期刊',
        'nextgen_desc3': '五位數的收入',
        'nextgen_desc4': '1000+ 學生申請',
        'looking_at': '關注領域',
        'interests1': 'AI 代理',
        'interests2': 'web2/web3 的未來',
        'interests3': '生物技術',
        'contact': '聯繫我 :)',
        'born': '出生',
        'based_in': '居住地',
        'education': '教育',
        'occupation': '職業',
        'known_for': '知名領域',
        'high_school': '高中',
        'entrepreneur': '企業家、研究員',
        'known_fields': 'AI、區塊鏈技術'
    },
    'ar': {
        'title': 'ريشي كانابارتي',
        'intro': 'أبني الأشياء. متورط في الشركات الناشئة والبلوكتشين والبحث',
        'interests': 'في وقت فراغي أحب الذهاب إلى صالة الألعاب الرياضية والمشي لمسافات طويلة وتسلق الصخور ومقابلة أشخاص رائعين والقراءة',
        'current_work': 'العمل الحالي',
        'building': 'بناء وإطلاق أشياء رائعة',
        'ai_work': 'العمل على حل هلوسات الذكاء الاصطناعي في RecallRAI',
        'college_dao': 'قيادة تطوير البحث والصندوق السائل في collegedao',
        'conference': 'تنظيم أكبر مؤتمر طلابي للبلوكتشين هذا العام في ديسمبر',
        'previous_work': 'العمل السابق',
        'stride_founder': 'المؤسس المشارك @ stride labs',
        'stride_desc1': 'صنع نعال تقويمية مخصصة بنقرة واحدة بدلاً من استغراق ما يصل إلى 4 ساعات لكل تصميم',
        'stride_desc2': 'باستخدام نموذج الذكاء الاصطناعي الخاص بنا المعلق براءة اختراع',
        'stride_desc3': 'عمل مع اثنين من أكبر مصنعي O&P في الولايات المتحدة',
        'nextgen_role': 'المدير التنفيذي للعمليات @ nextgenri',
        'nextgen_desc1': 'جعل البحث في متناول طلاب المدارس الثانوية من خلال تقديم الإرشاد والدعم للنشر بأسعار معقولة',
        'nextgen_desc2': 'إدارة مجلة المدرسة الثانوية',
        'nextgen_desc3': 'إيرادات بخمسة أرقام',
        'nextgen_desc4': '1000+ طالب تقدموا بطلب',
        'looking_at': 'مجالات الاهتمام',
        'interests1': 'وكلاء الذكاء الاصطناعي',
        'interests2': 'مستقبل web2/web3',
        'interests3': 'التكنولوجيا الحيوية',
        'contact': 'اتصل بي :)',
        'born': 'تاريخ الميلاد',
        'based_in': 'المقر',
        'education': 'التعليم',
        'occupation': 'المهنة',
        'known_for': 'معروف بـ',
        'high_school': 'المدرسة الثانوية',
        'entrepreneur': 'رائد أعمال، باحث',
        'known_fields': 'الذكاء الاصطناعي، تكنولوجيا البلوكتشين'
    },
    'ko': {
        'title': '리시 카나파르티',
        'intro': '저는 무언가를 만듭니다. 스타트업, 블록체인, 연구에 참여하고 있습니다',
        'interests': '여가 시간에는 헬스장에 가기, 하이킹, 암벽 등반, 멋진 사람들을 만나고 독서하는 것을 좋아합니다',
        'current_work': '현재 작업',
        'building': '멋진 것들을 만들고 배포합니다',
        'ai_work': 'RecallRAI에서 AI 환각 현상을 해결하는 작업 중',
        'college_dao': 'collegedao에서 연구 개발과 유동 자금을 이끌고 있습니다',
        'conference': '12월에 올해 최대의 학생 블록체인 컨퍼런스를 조직 중',
        'previous_work': '이전 작업',
        'stride_founder': '공동 창립자 @ stride labs',
        'stride_desc1': '한 번의 클릭으로 맞춤형 정형 깔창을 제작 (이전에는 디자인당 최대 4시간 소요)',
        'stride_desc2': '자체 특허 출원 중인 AI 모델 사용',
        'stride_desc3': '미국 최대 O&P 제조업체 2곳과 협력',
        'nextgen_role': '최고 운영 책임자 @ nextgenri',
        'nextgen_desc1': '저렴한 멘토링과 출판 지원을 통해 고등학생들이 연구에 접근할 수 있도록 함',
        'nextgen_desc2': '고등학교 저널 운영',
        'nextgen_desc3': '5자리 수익',
        'nextgen_desc4': '1000명 이상의 학생 지원',
        'looking_at': '관심 분야',
        'interests1': 'AI 에이전트',
        'interests2': 'web2/web3의 미래',
        'interests3': '바이오테크',
        'contact': '연락주세요 :)',
        'born': '출생',
        'based_in': '거주지',
        'education': '교육',
        'occupation': '직업',
        'known_for': '주요 분야',
        'high_school': '고등학교',
        'entrepreneur': '기업가, 연구원',
        'known_fields': 'AI, 블록체인 기술'
    },
    'ja': {
        'title': 'リシ・カナパルティ',
        'intro': '私はものづくりをしています。スタートアップ、ブロックチェーン、研究に関わっています',
        'interests': '余暇にはジム通い、ハイキング、ロッククライミング、素敵な人々との出会い、読書を楽しんでいます',
        'current_work': '現在の仕事',
        'building': 'クールなものを構築・リリースしています',
        'ai_work': 'RecallRAIでAIの幻覚問題の解決に取り組んでいます',
        'college_dao': 'collegedaoで研究開発と流動資金をリードしています',
        'conference': '12月に今年最大の学生ブロックチェーンカンファレンスを主催しています',
        'previous_work': '以前の仕事',
        'stride_founder': '共同創業者 @ stride labs',
        'stride_desc1': 'カスタム矯正インソールを1クリックで作成（以前はデザインごとに最大4時間かかっていました）',
        'stride_desc2': '独自の特許出願中のAIモデルを使用',
        'stride_desc3': '米国最大のO&Pメーカー2社と協力',
        'nextgen_role': '最高執行責任者 @ nextgenri',
        'nextgen_desc1': '手頃な価格のメンタリングと出版サポートを通じて、高校生が研究にアクセスできるようにしました',
        'nextgen_desc2': '高校ジャーナルを運営',
        'nextgen_desc3': '5桁の収益',
        'nextgen_desc4': '1000人以上の学生が応募',
        'looking_at': '注目分野',
        'interests1': 'AIエージェント',
        'interests2': 'web2/web3の未来',
        'interests3': 'バイオテクノロジー',
        'contact': 'お問い合わせ :)',
        'born': '生年月日',
        'based_in': '居住地',
        'education': '学歴',
        'occupation': '職業',
        'known_for': '専門分野',
        'high_school': '高校',
        'entrepreneur': '起業家、研究者',
        'known_fields': 'AI、ブロックチェーン技術'
    }
};
