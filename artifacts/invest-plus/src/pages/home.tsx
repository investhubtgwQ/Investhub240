  { code: "nl",    label: "Dutch",              native: "Nederlands",  flag: "🇳🇱" },
  { code: "pl",    label: "Polish",             native: "Polski",     flag: "🇵🇱" },
  { code: "id",    label: "Indonesian",         native: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "vi",    label: "Vietnamese",         native: "Tiếng Việt", flag: "🇻🇳" },
  { code: "th",    label: "Thai",               native: "ภาษาไทย",    flag: "🇹🇭" },
];

type LangCode = typeof LANGS[number]["code"];

interface T {
  tagline: string;
  hero1: string;
  hero2: string;
  heroSub: string;
  openWallet: string;
  viewPlans: string;
  statRoi: string;
  statUsers: string;
  statCoins: string;
  howTitle: string;
  howSub: string;
  step1Title: string; step1Desc: string;
  step2Title: string; step2Desc: string;
  step3Title: string; step3Desc: string;
  stepLabel: string;
  plansTitle: string; plansSub: string; plansDesc: string;
  startEarning: string;
  featTitle: string;
  feat1Title: string; feat1Desc: string;
  feat2Title: string; feat2Desc: string;
  feat3Title: string; feat3Desc: string;
  feat4Title: string; feat4Desc: string;
  ctaLive: string; ctaTitle: string; ctaSub: string; ctaBtn: string;
  signIn: string; getStarted: string; about: string;
  mostPopular: string; bestRoi: string; roiLabel: string;
  daysLabel: string; minLabel: string;
}

const TRANSLATIONS: Record<LangCode, T> = {
  en: {
    tagline: "Your Crypto.", hero1: "Your Crypto.", hero2: "Earning More.",
    heroSub: "Deposit, swap, and grow 100+ cryptocurrencies in one intelligent wallet — built for results.",
    openWallet: "Open Free Wallet", viewPlans: "View Plans",
    statRoi: "Max Annual ROI", statUsers: "Active Users", statCoins: "Coins Supported",
    howTitle: "How It Works", howSub: "Three steps to growth",
    step1Title: "Create your wallet", step1Desc: "Sign up in under 60 seconds. No bank account, no ID required — just your email.",
    step2Title: "Deposit any crypto", step2Desc: "Get a unique deposit address per coin. Send BTC, ETH, XRP, SOL, USDT and 100+ more directly in.",
    step3Title: "Watch it grow", step3Desc: "Pick an investment plan and earn up to 52% ROI. Swap between coins anytime, fee-free.",
    stepLabel: "Step",
    plansTitle: "Investment Plans", plansSub: "Pick your pace", plansDesc: "All plans are fixed-term with guaranteed ROI on completion.",
    startEarning: "Start Earning →",
    featTitle: "Built different",
    feat1Title: "Vault-grade Security", feat1Desc: "End-to-end encryption on every transaction.",
    feat2Title: "Instant Swap", feat2Desc: "Convert between 100+ coins in seconds, not hours.",
    feat3Title: "Real-time Prices", feat3Desc: "Live market rates — always up to date.",
    feat4Title: "AI-Powered Insights", feat4Desc: "Smart alerts and portfolio recommendations.",
    ctaLive: "Platform Live", ctaTitle: "Ready to grow your crypto?", ctaSub: "Join thousands of investors already earning with Invest Plus.",
    ctaBtn: "Create Free Account →",
    signIn: "Sign in", getStarted: "Get Started", about: "About",
    mostPopular: "Most Popular", bestRoi: "Best ROI", roiLabel: "ROI",
    daysLabel: "days", minLabel: "Min",
  },
  es: {
    tagline: "Tu Crypto.", hero1: "Tu Crypto.", hero2: "Ganando Más.",
    heroSub: "Deposita, intercambia y haz crecer 100+ criptomonedas en una billetera inteligente — creada para resultados.",
    openWallet: "Abrir Billetera Gratis", viewPlans: "Ver Planes",
    statRoi: "ROI Anual Máximo", statUsers: "Usuarios Activos", statCoins: "Monedas Admitidas",
    howTitle: "Cómo Funciona", howSub: "Tres pasos para crecer",
    step1Title: "Crea tu billetera", step1Desc: "Regístrate en menos de 60 segundos. Sin cuenta bancaria ni ID requerido.",
    step2Title: "Deposita cualquier cripto", step2Desc: "Obtén una dirección de depósito única por moneda. Envía BTC, ETH, XRP, SOL y 100+ más.",
    step3Title: "Míralo crecer", step3Desc: "Elige un plan de inversión y gana hasta un 52% de ROI. Intercambia entre monedas sin comisiones.",
    stepLabel: "Paso",
    plansTitle: "Planes de Inversión", plansSub: "Elige tu ritmo", plansDesc: "Todos los planes son a plazo fijo con ROI garantizado.",
    startEarning: "Empezar a Ganar →",
    featTitle: "Construido diferente",
    feat1Title: "Seguridad de bóveda", feat1Desc: "Cifrado de extremo a extremo en cada transacción.",
    feat2Title: "Intercambio instantáneo", feat2Desc: "Convierte entre 100+ monedas en segundos.",
    feat3Title: "Precios en tiempo real", feat3Desc: "Tasas de mercado en vivo — siempre actualizadas.",
    feat4Title: "Perspectivas con IA", feat4Desc: "Alertas inteligentes y recomendaciones de portafolio.",
    ctaLive: "Plataforma en Vivo", ctaTitle: "¿Listo para hacer crecer tu cripto?", ctaSub: "Únete a miles de inversores que ya ganan con Invest Plus.",
    ctaBtn: "Crear Cuenta Gratis →",
    signIn: "Iniciar sesión", getStarted: "Comenzar", about: "Acerca de",
    mostPopular: "Más Popular", bestRoi: "Mejor ROI", roiLabel: "ROI",
    daysLabel: "días", minLabel: "Mín",
  },
  fr: {
    tagline: "Votre Crypto.", hero1: "Votre Crypto.", hero2: "Qui Rapporte Plus.",
    heroSub: "Déposez, échangez et faites fructifier 100+ cryptomonnaies dans un portefeuille intelligent — conçu pour les résultats.",
    openWallet: "Ouvrir un Portefeuille Gratuit", viewPlans: "Voir les Plans",
    statRoi: "ROI Annuel Max", statUsers: "Utilisateurs Actifs", statCoins: "Coins Supportés",
    howTitle: "Comment Ça Marche", howSub: "Trois étapes vers la croissance",
    step1Title: "Créez votre portefeuille", step1Desc: "Inscrivez-vous en moins de 60 secondes. Aucun compte bancaire requis.",
    step2Title: "Déposez n'importe quelle crypto", step2Desc: "Obtenez une adresse de dépôt unique par coin. Envoyez BTC, ETH, XRP, SOL et 100+ autres.",
    step3Title: "Regardez-le croître", step3Desc: "Choisissez un plan d'investissement et gagnez jusqu'à 52% de ROI.",
    stepLabel: "Étape",
    plansTitle: "Plans d'Investissement", plansSub: "Choisissez votre rythme", plansDesc: "Tous les plans sont à durée fixe avec ROI garanti.",
    startEarning: "Commencer à Gagner →",
    featTitle: "Construit différemment",
    feat1Title: "Sécurité de niveau coffre", feat1Desc: "Chiffrement de bout en bout sur chaque transaction.",
    feat2Title: "Échange instantané", feat2Desc: "Convertissez entre 100+ coins en quelques secondes.",
    feat3Title: "Prix en temps réel", feat3Desc: "Taux du marché en direct — toujours à jour.",
    feat4Title: "Insights IA", feat4Desc: "Alertes intelligentes et recommandations de portefeuille.",
    ctaLive: "Plateforme en Direct", ctaTitle: "Prêt à faire fructifier vos cryptos?", ctaSub: "Rejoignez des milliers d'investisseurs qui gagnent déjà avec Invest Plus.",
    ctaBtn: "Créer un Compte Gratuit →",
    signIn: "Se connecter", getStarted: "Commencer", about: "À propos",
    mostPopular: "Plus Populaire", bestRoi: "Meilleur ROI", roiLabel: "ROI",
    daysLabel: "jours", minLabel: "Min",
  },
  pt: {
    tagline: "Sua Cripto.", hero1: "Sua Cripto.", hero2: "Rendendo Mais.",
    heroSub: "Deposite, troque e faça crescer 100+ criptomoedas em uma carteira inteligente — feita para resultados.",
    openWallet: "Abrir Carteira Grátis", viewPlans: "Ver Planos",
    statRoi: "ROI Anual Máx.", statUsers: "Usuários Ativos", statCoins: "Moedas Suportadas",
    howTitle: "Como Funciona", howSub: "Três passos para crescer",
    step1Title: "Crie sua carteira", step1Desc: "Cadastre-se em menos de 60 segundos. Sem conta bancária ou ID.",
    step2Title: "Deposite qualquer cripto", step2Desc: "Receba um endereço único por moeda. Envie BTC, ETH, XRP, SOL e 100+.",
    step3Title: "Veja crescer", step3Desc: "Escolha um plano e ganhe até 52% de ROI. Troque moedas sem taxas.",
    stepLabel: "Passo",
    plansTitle: "Planos de Investimento", plansSub: "Escolha seu ritmo", plansDesc: "Todos os planos são de prazo fixo com ROI garantido.",
    startEarning: "Começar a Ganhar →",
    featTitle: "Construído diferente",
    feat1Title: "Segurança cofre", feat1Desc: "Criptografia ponta a ponta em cada transação.",
    feat2Title: "Troca Instantânea", feat2Desc: "Converta entre 100+ moedas em segundos.",
    feat3Title: "Preços em Tempo Real", feat3Desc: "Taxas de mercado ao vivo — sempre atualizadas.",
    feat4Title: "Insights com IA", feat4Desc: "Alertas inteligentes e recomendações de portfólio.",
    ctaLive: "Plataforma ao Vivo", ctaTitle: "Pronto para crescer sua cripto?", ctaSub: "Junte-se a milhares de investidores já ganhando com Invest Plus.",
    ctaBtn: "Criar Conta Grátis →",
    signIn: "Entrar", getStarted: "Começar", about: "Sobre",
    mostPopular: "Mais Popular", bestRoi: "Melhor ROI", roiLabel: "ROI",
    daysLabel: "dias", minLabel: "Mín",
  },
  de: {
    tagline: "Deine Krypto.", hero1: "Deine Krypto.", hero2: "Mehr Verdienen.",
    heroSub: "Einzahlen, tauschen und 100+ Kryptowährungen in einem intelligenten Wallet wachsen lassen — für echte Ergebnisse.",
    openWallet: "Kostenloses Wallet öffnen", viewPlans: "Pläne ansehen",
    statRoi: "Max. Jahres-ROI", statUsers: "Aktive Nutzer", statCoins: "Unterstützte Coins",
    howTitle: "Wie es funktioniert", howSub: "Drei Schritte zum Wachstum",
    step1Title: "Wallet erstellen", step1Desc: "Anmeldung in unter 60 Sekunden. Kein Bankkonto, kein Ausweis erforderlich.",
    step2Title: "Beliebige Krypto einzahlen", step2Desc: "Erhalte eine einzigartige Einzahlungsadresse pro Coin. BTC, ETH, XRP, SOL und 100+ mehr.",
    step3Title: "Wachstum beobachten", step3Desc: "Wähle einen Investitionsplan und verdiene bis zu 52% ROI.",
    stepLabel: "Schritt",
    plansTitle: "Investitionspläne", plansSub: "Wähle dein Tempo", plansDesc: "Alle Pläne sind befristet mit garantiertem ROI.",
    startEarning: "Jetzt verdienen →",
    featTitle: "Anders gebaut",
    feat1Title: "Tresor-Sicherheit", feat1Desc: "Ende-zu-Ende-Verschlüsselung bei jeder Transaktion.",
    feat2Title: "Sofortiger Tausch", feat2Desc: "Konvertiere zwischen 100+ Coins in Sekunden.",
    feat3Title: "Echtzeit-Preise", feat3Desc: "Live-Marktpreise — immer aktuell.",
    feat4Title: "KI-gestützte Einblicke", feat4Desc: "Intelligente Alerts und Portfolio-Empfehlungen.",
    ctaLive: "Plattform Live", ctaTitle: "Bereit, deine Krypto wachsen zu lassen?", ctaSub: "Schließe dich tausenden Investoren an, die bereits mit Invest Plus verdienen.",
    ctaBtn: "Kostenloses Konto erstellen →",
    signIn: "Anmelden", getStarted: "Loslegen", about: "Über uns",
    mostPopular: "Beliebteste", bestRoi: "Bester ROI", roiLabel: "ROI",
    daysLabel: "Tage", minLabel: "Min",
  },
  it: {
    tagline: "La tua Cripto.", hero1: "La tua Cripto.", hero2: "Guadagna di Più.",
    heroSub: "Deposita, scambia e fai crescere 100+ criptovalute in un portafoglio intelligente — fatto per i risultati.",
    openWallet: "Apri Portafoglio Gratuito", viewPlans: "Vedi Piani",
    statRoi: "ROI Annuale Max", statUsers: "Utenti Attivi", statCoins: "Coin Supportate",
    howTitle: "Come Funziona", howSub: "Tre passi verso la crescita",
    step1Title: "Crea il tuo portafoglio", step1Desc: "Registrati in meno di 60 secondi. Nessun conto bancario richiesto.",
    step2Title: "Deposita qualsiasi cripto", step2Desc: "Ottieni un indirizzo unico per coin. Invia BTC, ETH, XRP, SOL e 100+ altri.",
    step3Title: "Guardalo crescere", step3Desc: "Scegli un piano e guadagna fino al 52% di ROI.",
    stepLabel: "Passo",
    plansTitle: "Piani di Investimento", plansSub: "Scegli il tuo ritmo", plansDesc: "Tutti i piani sono a termine fisso con ROI garantito.",
    startEarning: "Inizia a Guadagnare →",
    featTitle: "Costruito diversamente",
    feat1Title: "Sicurezza blindata", feat1Desc: "Crittografia end-to-end su ogni transazione.",
    feat2Title: "Scambio istantaneo", feat2Desc: "Converti tra 100+ coin in pochi secondi.",
    feat3Title: "Prezzi in tempo reale", feat3Desc: "Tassi di mercato live — sempre aggiornati.",
    feat4Title: "Intuizioni AI", feat4Desc: "Avvisi intelligenti e consigli sul portafoglio.",
    ctaLive: "Piattaforma Live", ctaTitle: "Pronto a far crescere la tua cripto?", ctaSub: "Unisciti a migliaia di investitori che guadagnano con Invest Plus.",
    ctaBtn: "Crea Account Gratuito →",
    signIn: "Accedi", getStarted: "Inizia", about: "Chi siamo",
    mostPopular: "Più Popolare", bestRoi: "Miglior ROI", roiLabel: "ROI",
    daysLabel: "giorni", minLabel: "Min",
  },
  ru: {
    tagline: "Ваша Крипто.", hero1: "Ваша Крипто.", hero2: "Зарабатывает Больше.",
    heroSub: "Вносите, обменивайте и приумножайте 100+ криптовалют в одном умном кошельке — для реальных результатов.",
    openWallet: "Открыть бесплатный кошелёк", viewPlans: "Просмотреть планы",
    statRoi: "Макс. годовой ROI", statUsers: "Активных пользователей", statCoins: "Монет поддерживается",
    howTitle: "Как это работает", howSub: "Три шага к росту",
    step1Title: "Создайте кошелёк", step1Desc: "Регистрация менее чем за 60 секунд. Без банковского счёта.",
    step2Title: "Внесите любую крипту", step2Desc: "Получите уникальный адрес для каждой монеты. BTC, ETH, XRP, SOL и 100+ других.",
    step3Title: "Наблюдайте за ростом", step3Desc: "Выберите инвестиционный план и зарабатывайте до 52% ROI.",
    stepLabel: "Шаг",
    plansTitle: "Инвестиционные Планы", plansSub: "Выберите свой темп", plansDesc: "Все планы имеют фиксированный срок с гарантированным ROI.",
    startEarning: "Начать зарабатывать →",
    featTitle: "Создан иначе",
    feat1Title: "Безопасность уровня хранилища", feat1Desc: "Сквозное шифрование каждой транзакции.",
    feat2Title: "Мгновенный обмен", feat2Desc: "Конвертируйте между 100+ монетами за секунды.",
    feat3Title: "Цены в реальном времени", feat3Desc: "Актуальные рыночные ставки — всегда обновлены.",
    feat4Title: "ИИ-аналитика", feat4Desc: "Умные оповещения и рекомендации по портфелю.",
    ctaLive: "Платформа работает", ctaTitle: "Готовы приумножить крипту?", ctaSub: "Присоединяйтесь к тысячам инвесторов, уже зарабатывающих с Invest Plus.",
    ctaBtn: "Создать бесплатный аккаунт →",
    signIn: "Войти", getStarted: "Начать", about: "О нас",
    mostPopular: "Самый Популярный", bestRoi: "Лучший ROI", roiLabel: "ROI",
    daysLabel: "дней", minLabel: "Мин",
  },
  ar: {
    tagline: "عملتك المشفرة.", hero1: "عملتك المشفرة.", hero2: "تكسب أكثر.",
    heroSub: "أودع وبادل ونمّ 100+ عملة مشفرة في محفظة ذكية واحدة — مبنية للنتائج.",
    openWallet: "افتح محفظة مجانية", viewPlans: "عرض الخطط",
    statRoi: "أقصى عائد سنوي", statUsers: "مستخدم نشط", statCoins: "عملة مدعومة",
    howTitle: "كيف يعمل", howSub: "ثلاث خطوات للنمو",
    step1Title: "أنشئ محفظتك", step1Desc: "سجّل في أقل من 60 ثانية. لا حساب بنكي ولا هوية مطلوبة.",
    step2Title: "أودع أي عملة مشفرة", step2Desc: "احصل على عنوان إيداع فريد لكل عملة. أرسل BTC وETH وXRP وSOL و100+ أخرى.",
    step3Title: "راقبها تنمو", step3Desc: "اختر خطة استثمارية واربح حتى 52% عائد. بادل بين العملات دون رسوم.",
    stepLabel: "خطوة",
    plansTitle: "خطط الاستثمار", plansSub: "اختر وتيرتك", plansDesc: "جميع الخطط محددة المدة مع عائد مضمون.",
    startEarning: "ابدأ الربح ←",
    featTitle: "مبني بشكل مختلف",
    feat1Title: "أمان على مستوى الخزينة", feat1Desc: "تشفير من طرف إلى طرف في كل معاملة.",
    feat2Title: "تبادل فوري", feat2Desc: "تحويل بين 100+ عملة في ثوانٍ.",
    feat3Title: "أسعار فورية", feat3Desc: "أسعار السوق الحية — محدّثة دائمًا.",
    feat4Title: "رؤى مدعومة بالذكاء الاصطناعي", feat4Desc: "تنبيهات ذكية وتوصيات للمحفظة.",
    ctaLive: "المنصة مباشرة", ctaTitle: "هل أنت مستعد لتنمية عملتك المشفرة؟", ctaSub: "انضم إلى آلاف المستثمرين الذين يكسبون بالفعل مع Invest Plus.",
    ctaBtn: "إنشاء حساب مجاني ←",
    signIn: "تسجيل الدخول", getStarted: "ابدأ", about: "حول",
    mostPopular: "الأكثر شعبية", bestRoi: "أفضل عائد", roiLabel: "عائد",
    daysLabel: "يوم", minLabel: "الحد الأدنى",
  },
  zh: {
    tagline: "您的加密货币。", hero1: "您的加密货币。", hero2: "赚取更多。",
    heroSub: "在一个智能钱包中存款、兑换和增长100+种加密货币——为结果而生。",
    openWallet: "开设免费钱包", viewPlans: "查看计划",
    statRoi: "最高年化收益", statUsers: "活跃用户", statCoins: "支持币种",
    howTitle: "如何运作", howSub: "三步实现增长",
    step1Title: "创建您的钱包", step1Desc: "60秒内完成注册。无需银行账户或身份证。",
    step2Title: "存入任意加密货币", step2Desc: "每种币获取唯一存款地址。支持BTC、ETH、XRP、SOL等100+种。",
    step3Title: "见证增长", step3Desc: "选择投资计划，赚取高达52%的年化收益。随时免费兑换。",
    stepLabel: "步骤",
    plansTitle: "投资计划", plansSub: "选择您的节奏", plansDesc: "所有计划均为固定期限，完成时保证收益。",
    startEarning: "开始赚取 →",
    featTitle: "与众不同",
    feat1Title: "金库级安全", feat1Desc: "每笔交易端到端加密。",
    feat2Title: "即时兑换", feat2Desc: "几秒钟内兑换100+种币。",
    feat3Title: "实时价格", feat3Desc: "实时市场汇率——始终最新。",
    feat4Title: "AI驱动洞察", feat4Desc: "智能提醒和投资组合建议。",
    ctaLive: "平台运行中", ctaTitle: "准备好发展您的加密货币了吗？", ctaSub: "加入数千名已在Invest Plus赚钱的投资者。",
    ctaBtn: "创建免费账户 →",
    signIn: "登录", getStarted: "开始", about: "关于",
    mostPopular: "最受欢迎", bestRoi: "最佳收益", roiLabel: "收益率",
    daysLabel: "天", minLabel: "最低",
  },
  ja: {
    tagline: "あなたの仮想通貨。", hero1: "あなたの仮想通貨。", hero2: "もっと稼ごう。",
    heroSub: "100以上の暗号通貨を一つのスマートウォレットで入金・交換・運用 — 成果のために設計されています。",
    openWallet: "無料ウォレットを開く", viewPlans: "プランを見る",
    statRoi: "最大年間ROI", statUsers: "アクティブユーザー", statCoins: "対応コイン数",
    howTitle: "仕組み", howSub: "3ステップで成長",
    step1Title: "ウォレット作成", step1Desc: "60秒以内に登録。銀行口座や身分証明書不要。",
    step2Title: "任意の仮想通貨を入金", step2Desc: "コインごとに固有の入金アドレスを取得。BTC、ETH、XRP、SOL他100+対応。",
    step3Title: "成長を見守る", step3Desc: "投資プランを選び最大52%のROIを獲得。手数料無料でいつでも交換可能。",
    stepLabel: "ステップ",
    plansTitle: "投資プラン", plansSub: "ペースを選択", plansDesc: "全プランは固定期間で完了時にROIが保証されます。",
    startEarning: "稼ぎ始める →",
    featTitle: "違いを生む設計",
    feat1Title: "金庫級セキュリティ", feat1Desc: "全取引でエンドツーエンド暗号化。",
    feat2Title: "即時スワップ", feat2Desc: "100+コインを数秒で変換。",
    feat3Title: "リアルタイム価格", feat3Desc: "ライブ市場レート — 常に最新。",
    feat4Title: "AIインサイト", feat4Desc: "スマートアラートとポートフォリオ推奨。",
    ctaLive: "プラットフォーム稼働中", ctaTitle: "仮想通貨を増やす準備はできましたか？", ctaSub: "Invest Plusですでに稼いでいる数千人の投資家に参加しましょう。",
    ctaBtn: "無料アカウントを作成 →",
    signIn: "サインイン", getStarted: "始める", about: "について",
    mostPopular: "最も人気", bestRoi: "最高ROI", roiLabel: "ROI",
    daysLabel: "日", minLabel: "最低",
  },
  ko: {
    tagline: "당신의 암호화폐。", hero1: "당신의 암호화폐。", hero2: "더 많이 벌기。",
    heroSub: "하나의 스마트 지갑에서 100개 이상의 암호화폐를 입금, 교환, 성장시키세요 — 결과를 위해 만들어졌습니다。",
    openWallet: "무료 지갑 열기", viewPlans: "플랜 보기",
    statRoi: "최대 연간 ROI", statUsers: "활성 사용자", statCoins: "지원 코인",
    howTitle: "작동 방식", howSub: "성장을 위한 세 단계",
    step1Title: "지갑 만들기", step1Desc: "60초 이내에 가입하세요. 은행 계좌나 신분증 불필요.",
    step2Title: "암호화폐 입금", step2Desc: "코인별 고유 입금 주소를 받으세요. BTC, ETH, XRP, SOL 등 100개 이상.",
    step3Title: "성장 지켜보기", step3Desc: "투자 플랜을 선택하고 최대 52% ROI를 받으세요。",
    stepLabel: "단계",
    plansTitle: "투자 플랜", plansSub: "속도를 선택하세요", plansDesc: "모든 플랜은 완료 시 보장된 ROI를 제공합니다.",
    startEarning: "수익 시작하기 →",
    featTitle: "다르게 만들어졌습니다",
    feat1Title: "금고급 보안", feat1Desc: "모든 거래에 종단간 암호화.",
    feat2Title: "즉시 스왑", feat2Desc: "100개 이상의 코인을 초 단위로 변환.",
    feat3Title: "실시간 가격", feat3Desc: "라이브 시장 요율 — 항상 최신.",
    feat4Title: "AI 인사이트", feat4Desc: "스마트 알림 및 포트폴리오 추천.",
    ctaLive: "플랫폼 라이브", ctaTitle: "암호화폐를 성장시킬 준비가 됐나요?", ctaSub: "이미 Invest Plus로 수익을 올리는 수천 명의 투자자에 합류하세요.",
    ctaBtn: "무료 계정 만들기 →",
    signIn: "로그인", getStarted: "시작하기", about: "소개",
    mostPopular: "가장 인기", bestRoi: "최고 ROI", roiLabel: "ROI",
    daysLabel: "일", minLabel: "최소",
  },
  hi: {
    tagline: "आपकी क्रिप्टो।", hero1: "आपकी क्रिप्टो।", hero2: "ज़्यादा कमाएं।",
    heroSub: "एक बुद्धिमान वॉलेट में 100+ क्रिप्टोकरेंसी जमा करें, स्वैप करें और बढ़ाएं — परिणामों के लिए बनाया गया।",
    openWallet: "मुफ्त वॉलेट खोलें", viewPlans: "योजनाएं देखें",
    statRoi: "अधिकतम वार्षिक ROI", statUsers: "सक्रिय उपयोगकर्ता", statCoins: "समर्थित सिक्के",
    howTitle: "यह कैसे काम करता है", howSub: "विकास के तीन चरण",
    step1Title: "अपना वॉलेट बनाएं", step1Desc: "60 सेकंड में साइन अप करें। कोई बैंक खाता या ID आवश्यक नहीं।",
    step2Title: "कोई भी क्रिप्टो जमा करें", step2Desc: "प्रत्येक सिक्के के लिए अद्वितीय पता प्राप्त करें। BTC, ETH, XRP, SOL और 100+ अधिक।",
    step3Title: "इसे बढ़ते देखें", step3Desc: "एक निवेश योजना चुनें और 52% तक ROI कमाएं।",
    stepLabel: "चरण",
    plansTitle: "निवेश योजनाएं", plansSub: "अपनी गति चुनें", plansDesc: "सभी योजनाएं निश्चित अवधि की हैं जिसमें ROI की गारंटी है।",
    startEarning: "कमाना शुरू करें →",
    featTitle: "अलग तरीके से बनाया गया",
    feat1Title: "वॉल्ट-स्तरीय सुरक्षा", feat1Desc: "हर लेनदेन पर एंड-टू-एंड एन्क्रिप्शन।",
    feat2Title: "तत्काल स्वैप", feat2Desc: "100+ सिक्कों के बीच सेकंड में कन्वर्ट करें।",
    feat3Title: "रीयल-टाइम कीमतें", feat3Desc: "लाइव बाजार दरें — हमेशा अपडेट।",
    feat4Title: "AI-संचालित अंतर्दृष्टि", feat4Desc: "स्मार्ट अलर्ट और पोर्टफोलियो सिफारिशें।",
    ctaLive: "प्लेटफ़ॉर्म लाइव", ctaTitle: "अपनी क्रिप्टो बढ़ाने के लिए तैयार हैं?", ctaSub: "हजारों निवेशकों से जुड़ें जो पहले से Invest Plus के साथ कमा रहे हैं।",
    ctaBtn: "मुफ्त खाता बनाएं →",
    signIn: "साइन इन", getStarted: "शुरू करें", about: "हमारे बारे में",
    mostPopular: "सबसे लोकप्रिय", bestRoi: "सर्वश्रेष्ठ ROI", roiLabel: "ROI",
    daysLabel: "दिन", minLabel: "न्यूनतम",
  },
  tr: {
    tagline: "Kripto Paranız.", hero1: "Kripto Paranız.", hero2: "Daha Fazla Kazanıyor.",
    heroSub: "Tek bir akıllı cüzdanda 100+ kripto para yatırın, takas edin ve büyütün — sonuçlar için tasarlandı.",
    openWallet: "Ücretsiz Cüzdan Aç", viewPlans: "Planları Gör",
    statRoi: "Maks. Yıllık ROI", statUsers: "Aktif Kullanıcı", statCoins: "Desteklenen Coin",
    howTitle: "Nasıl Çalışır", howSub: "Büyüme için üç adım",
    step1Title: "Cüzdanınızı oluşturun", step1Desc: "60 saniyeden kısa sürede kaydolun. Banka hesabı veya kimlik gerekmez.",
    step2Title: "Herhangi bir kripto yatırın", step2Desc: "Her coin için benzersiz adres alın. BTC, ETH, XRP, SOL ve 100+ daha.",
    step3Title: "Büyümesini izleyin", step3Desc: "%52'ye kadar ROI kazanın. Coinler arasında ücretsiz takas yapın.",
    stepLabel: "Adım",
    plansTitle: "Yatırım Planları", plansSub: "Temponuzu seçin", plansDesc: "Tüm planlar sabit vadeli ve tamamlandığında garantili ROI ile.",
    startEarning: "Kazanmaya Başla →",
    featTitle: "Farklı inşa edildi",
    feat1Title: "Kasa düzeyi güvenlik", feat1Desc: "Her işlemde uçtan uca şifreleme.",
    feat2Title: "Anında Takas", feat2Desc: "100+ coin arasında saniyeler içinde dönüştürün.",
    feat3Title: "Gerçek Zamanlı Fiyatlar", feat3Desc: "Canlı piyasa kurları — her zaman güncel.",
    feat4Title: "AI Destekli Bilgiler", feat4Desc: "Akıllı uyarılar ve portföy önerileri.",
    ctaLive: "Platform Canlı", ctaTitle: "Kriptonuzu büyütmeye hazır mısınız?", ctaSub: "Invest Plus ile zaten kazanan binlerce yatırımcıya katılın.",
    ctaBtn: "Ücretsiz Hesap Oluştur →",
    signIn: "Giriş Yap", getStarted: "Başla", about: "Hakkında",
    mostPopular: "En Popüler", bestRoi: "En İyi ROI", roiLabel: "ROI",
    daysLabel: "gün", minLabel: "Min",
  },
  nl: {
    tagline: "Uw Crypto.", hero1: "Uw Crypto.", hero2: "Verdient Meer.",
    heroSub: "Stort, wissel en laat 100+ cryptovaluta groeien in één slimme portemonnee — gebouwd voor resultaten.",
    openWallet: "Gratis Portemonnee Openen", viewPlans: "Plannen Bekijken",
    statRoi: "Max. Jaarlijks ROI", statUsers: "Actieve Gebruikers", statCoins: "Ondersteunde Coins",
    howTitle: "Hoe het werkt", howSub: "Drie stappen naar groei",
    step1Title: "Maak uw portemonnee", step1Desc: "Registreer in minder dan 60 seconden. Geen bankrekening of ID vereist.",
    step2Title: "Stort elke crypto", step2Desc: "Krijg een uniek stortingsadres per coin. Stuur BTC, ETH, XRP, SOL en 100+ meer.",
    step3Title: "Zie het groeien", step3Desc: "Kies een investeringsplan en verdien tot 52% ROI.",
    stepLabel: "Stap",
    plansTitle: "Investeringsplannen", plansSub: "Kies uw tempo", plansDesc: "Alle plannen hebben een vaste looptijd met gegarandeerd ROI.",
    startEarning: "Begin met Verdienen →",
    featTitle: "Anders gebouwd",
    feat1Title: "Kluis-niveau beveiliging", feat1Desc: "End-to-end encryptie op elke transactie.",
    feat2Title: "Directe Swap", feat2Desc: "Converteer tussen 100+ coins in seconden.",
    feat3Title: "Realtime Prijzen", feat3Desc: "Live markttarieven — altijd bijgewerkt.",
    feat4Title: "AI-gedreven Inzichten", feat4Desc: "Slimme waarschuwingen en portefeuilleaanbevelingen.",
    ctaLive: "Platform Live", ctaTitle: "Klaar om uw crypto te laten groeien?", ctaSub: "Sluit u aan bij duizenden investeerders die al verdienen met Invest Plus.",
    ctaBtn: "Gratis Account Aanmaken →",
    signIn: "Inloggen", getStarted: "Begin", about: "Over",
    mostPopular: "Meest Populair", bestRoi: "Beste ROI", roiLabel: "ROI",
    daysLabel: "dagen", minLabel: "Min",
  },
  pl: {
    tagline: "Twoja krypto.", hero1: "Twoja krypto.", hero2: "Zarabia więcej.",
    heroSub: "Wpłacaj, wymieniaj i rozwijaj 100+ kryptowalut w jednym inteligentnym portfelu — stworzonym dla wyników.",
    openWallet: "Otwórz bezpłatny portfel", viewPlans: "Zobacz plany",
    statRoi: "Maks. roczny ROI", statUsers: "Aktywnych użytkowników", statCoins: "Obsługiwanych coinów",
    howTitle: "Jak to działa", howSub: "Trzy kroki do wzrostu",
    step1Title: "Utwórz portfel", step1Desc: "Zarejestruj się w mniej niż 60 sekund. Bez konta bankowego ani dowodu.",
    step2Title: "Wpłać dowolną krypto", step2Desc: "Otrzymaj unikalny adres dla każdego coina. BTC, ETH, XRP, SOL i 100+.",
    step3Title: "Obserwuj wzrost", step3Desc: "Wybierz plan inwestycyjny i zarabiaj do 52% ROI.",
    stepLabel: "Krok",
    plansTitle: "Plany Inwestycyjne", plansSub: "Wybierz swoje tempo", plansDesc: "Wszystkie plany są terminowe z gwarantowanym ROI.",
    startEarning: "Zacznij zarabiać →",
    featTitle: "Zbudowany inaczej",
    feat1Title: "Bezpieczeństwo skarbca", feat1Desc: "Szyfrowanie end-to-end każdej transakcji.",
    feat2Title: "Natychmiastowa zamiana", feat2Desc: "Konwertuj między 100+ coinami w sekundy.",
    feat3Title: "Ceny w czasie rzeczywistym", feat3Desc: "Stawki rynkowe na żywo — zawsze aktualne.",
    feat4Title: "Spostrzeżenia AI", feat4Desc: "Inteligentne alerty i rekomendacje portfela.",
    ctaLive: "Platforma działa", ctaTitle: "Gotowy na wzrost swojej krypto?", ctaSub: "Dołącz do tysięcy inwestorów zarabiających z Invest Plus.",
    ctaBtn: "Utwórz darmowe konto →",
    signIn: "Zaloguj się", getStarted: "Zacznij", about: "O nas",
    mostPopular: "Najpopularniejszy", bestRoi: "Najlepszy ROI", roiLabel: "ROI",
    daysLabel: "dni", minLabel: "Min",
  },
  id: {
    tagline: "Kripto Anda.", hero1: "Kripto Anda.", hero2: "Menghasilkan Lebih.",
    heroSub: "Setor, tukar, dan kembangkan 100+ mata uang kripto dalam satu dompet cerdas — dirancang untuk hasil.",
    openWallet: "Buka Dompet Gratis", viewPlans: "Lihat Rencana",
    statRoi: "ROI Tahunan Maks.", statUsers: "Pengguna Aktif", statCoins: "Koin Didukung",
    howTitle: "Cara Kerja", howSub: "Tiga langkah menuju pertumbuhan",
    step1Title: "Buat dompet Anda", step1Desc: "Daftar dalam 60 detik. Tidak perlu rekening bank atau ID.",
    step2Title: "Setor kripto apapun", step2Desc: "Dapatkan alamat setoran unik per koin. Kirim BTC, ETH, XRP, SOL dan 100+ lainnya.",
    step3Title: "Saksikan pertumbuhannya", step3Desc: "Pilih rencana investasi dan dapatkan hingga 52% ROI.",
    stepLabel: "Langkah",
    plansTitle: "Rencana Investasi", plansSub: "Pilih kecepatan Anda", plansDesc: "Semua rencana berjangka tetap dengan ROI terjamin.",
    startEarning: "Mulai Menghasilkan →",
    featTitle: "Dibangun berbeda",
    feat1Title: "Keamanan tingkat brankas", feat1Desc: "Enkripsi ujung ke ujung di setiap transaksi.",
    feat2Title: "Tukar Instan", feat2Desc: "Konversi antara 100+ koin dalam hitungan detik.",
    feat3Title: "Harga Real-time", feat3Desc: "Kurs pasar langsung — selalu diperbarui.",
    feat4Title: "Wawasan Bertenaga AI", feat4Desc: "Peringatan cerdas dan rekomendasi portofolio.",
    ctaLive: "Platform Aktif", ctaTitle: "Siap mengembangkan kripto Anda?", ctaSub: "Bergabunglah dengan ribuan investor yang sudah menghasilkan dengan Invest Plus.",
    ctaBtn: "Buat Akun Gratis →",
    signIn: "Masuk", getStarted: "Mulai", about: "Tentang",
    mostPopular: "Paling Populer", bestRoi: "ROI Terbaik", roiLabel: "ROI",
    daysLabel: "hari", minLabel: "Min",
  },
  vi: {
    tagline: "Tiền mã hóa của bạn.", hero1: "Tiền mã hóa của bạn.", hero2: "Kiếm nhiều hơn.",
    heroSub: "Nạp, hoán đổi và phát triển 100+ loại tiền mã hóa trong một ví thông minh — được xây dựng vì kết quả.",
    openWallet: "Mở ví miễn phí", viewPlans: "Xem kế hoạch",
    statRoi: "ROI tối đa hàng năm", statUsers: "Người dùng hoạt động", statCoins: "Coin được hỗ trợ",
    howTitle: "Cách hoạt động", howSub: "Ba bước để tăng trưởng",
    step1Title: "Tạo ví của bạn", step1Desc: "Đăng ký trong vòng 60 giây. Không cần tài khoản ngân hàng hay ID.",
    step2Title: "Nạp bất kỳ crypto nào", step2Desc: "Nhận địa chỉ nạp tiền duy nhất cho mỗi coin. BTC, ETH, XRP, SOL và 100+ nữa.",
    step3Title: "Xem nó phát triển", step3Desc: "Chọn kế hoạch đầu tư và kiếm tới 52% ROI.",
    stepLabel: "Bước",
    plansTitle: "Kế hoạch đầu tư", plansSub: "Chọn tốc độ của bạn", plansDesc: "Tất cả kế hoạch có thời hạn cố định với ROI được đảm bảo.",
    startEarning: "Bắt đầu kiếm tiền →",
    featTitle: "Được xây dựng khác biệt",
    feat1Title: "Bảo mật cấp kho", feat1Desc: "Mã hóa đầu cuối trên mọi giao dịch.",
    feat2Title: "Hoán đổi tức thì", feat2Desc: "Chuyển đổi giữa 100+ coin trong vài giây.",
    feat3Title: "Giá thực tế", feat3Desc: "Tỷ giá thị trường trực tiếp — luôn cập nhật.",
    feat4Title: "Thông tin AI", feat4Desc: "Cảnh báo thông minh và đề xuất danh mục.",
    ctaLive: "Nền tảng hoạt động", ctaTitle: "Sẵn sàng phát triển crypto của bạn?", ctaSub: "Tham gia hàng nghìn nhà đầu tư đã kiếm tiền với Invest Plus.",
    ctaBtn: "Tạo tài khoản miễn phí →",
    signIn: "Đăng nhập", getStarted: "Bắt đầu", about: "Về chúng tôi",
    mostPopular: "Phổ biến nhất", bestRoi: "ROI tốt nhất", roiLabel: "ROI",
    daysLabel: "ngày", minLabel: "Tối thiểu",
  },
  th: {
    tagline: "คริปโตของคุณ。", hero1: "คริปโตของคุณ。", hero2: "ทำกำไรได้มากขึ้น。",
    heroSub: "ฝาก แลก และเติบโต 100+ สกุลเงินดิจิทัลในกระเป๋าเงินอัจฉริยะเดียว — สร้างมาเพื่อผลลัพธ์",
    openWallet: "เปิดกระเป๋าเงินฟรี", viewPlans: "ดูแผน",
    statRoi: "ROI สูงสุดต่อปี", statUsers: "ผู้ใช้ที่ใช้งาน", statCoins: "สกุลเงินที่รองรับ",
    howTitle: "วิธีการทำงาน", howSub: "สามขั้นตอนสู่การเติบโต",
    step1Title: "สร้างกระเป๋าเงิน", step1Desc: "ลงทะเบียนภายใน 60 วินาที ไม่ต้องมีบัญชีธนาคารหรือบัตรประชาชน",
    step2Title: "ฝากคริปโตใดก็ได้", step2Desc: "รับที่อยู่ฝากเงินเฉพาะต่อสกุลเงิน BTC ETH XRP SOL และอีก 100+",
    step3Title: "ดูมันเติบโต", step3Desc: "เลือกแผนการลงทุนและรับ ROI สูงสุด 52%",
    stepLabel: "ขั้นตอน",
    plansTitle: "แผนการลงทุน", plansSub: "เลือกจังหวะของคุณ", plansDesc: "แผนทั้งหมดมีระยะเวลาคงที่พร้อม ROI ที่รับประกัน",
    startEarning: "เริ่มทำกำไร →",
    featTitle: "สร้างมาต่างกัน",
    feat1Title: "ความปลอดภัยระดับห้องนิรภัย", feat1Desc: "การเข้ารหัสจากต้นทางถึงปลายทางในทุกธุรกรรม",
    feat2Title: "แลกทันที", feat2Desc: "แปลงระหว่าง 100+ สกุลเงินในไม่กี่วินาที",
    feat3Title: "ราคาแบบเรียลไทม์", feat3Desc: "อัตราตลาดสด — อัปเดตอยู่เสมอ",
    feat4Title: "ข้อมูลเชิงลึกด้วย AI", feat4Desc: "การแจ้งเตือนอัจฉริยะและคำแนะนำพอร์ตโฟลิโอ",
    ctaLive: "แพลตฟอร์มออนไลน์", ctaTitle: "พร้อมที่จะเติบโตคริปโตของคุณหรือยัง?", ctaSub: "ร่วมกับนักลงทุนหลายพันคนที่กำลังทำกำไรกับ Invest Plus",
    ctaBtn: "สร้างบัญชีฟรี →",
    signIn: "เข้าสู่ระบบ", getStarted: "เริ่มต้น", about: "เกี่ยวกับ",
    mostPopular: "ยอดนิยมที่สุด", bestRoi: "ROI ดีที่สุด", roiLabel: "ROI",
    daysLabel: "วัน", minLabel: "ขั้นต่ำ",
  },
};

// ── Language Picker ───────────────────────────────────────────────────────────

function LangPicker({ lang, setLang }: { lang: LangCode; setLang: (l: LangCode) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find(l => l.code === lang)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors text-sm font-medium text-gray-600"
      >
        <Globe className="w-4 h-4 text-gray-500" />
        <span className="hidden sm:inline">{current.flag} {current.native}</span>
        <span className="sm:hidden">{current.flag}</span>
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50 max-h-80 overflow-y-auto">
          {LANGS.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-base leading-none">{l.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900">{l.native}</div>
                <div className="text-xs text-gray-400">{l.label}</div>
              </div>
              {l.code === lang && <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedStat({ target, prefix = "", suffix = "" }: {
  target: number; prefix?: string; suffix?: string;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{prefix}{Math.floor(val).toLocaleString()}{suffix}</span>;
}

// ── Floating coin orb ─────────────────────────────────────────────────────────
const COIN_COLORS: Record<string, string> = {
  btc: "#F7931A", eth: "#627EEA", usdt: "#26A17B", bnb: "#F3BA2F", trx: "#EF0027",
  xrp: "#346AA9", sol: "#9945FF", doge: "#C2A633", ada: "#0033AD", matic: "#8247E5",
  link: "#2A5ADA", dot: "#E6007A", avax: "#E84142", ton: "#0098EA", near: "#00C08B",
};
const COIN_LABELS: Record<string, string> = {
  btc: "₿", eth: "Ξ", usdt: "₮", bnb: "B", trx: "T",
  xrp: "✦", sol: "◎", doge: "Ð", ada: "₳", matic: "⬡",
  link: "⬡", dot: "●", avax: "▲", ton: "◆", near: "Ⓝ",
};

function CoinOrb({ slug, size, x, y, delay }: { slug: string; size: number; x: string; y: string; delay: string }) {
  return (
    <div
      className="absolute rounded-full flex items-center justify-center shadow-lg select-none pointer-events-none"
      style={{
        width: size, height: size, left: x, top: y,
        background: COIN_COLORS[slug] ?? "#6B7280",
        animation: "float 4s ease-in-out infinite",
        animationDelay: delay,
        fontSize: size * 0.36, color: "white", fontWeight: 800, zIndex: 0, opacity: 0.9,
      }}
    >
      {COIN_LABELS[slug] ?? slug.slice(0, 1).toUpperCase()}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [lang, setLang] = useState<LangCode>("en");
  const t = TRANSLATIONS[lang] ?? TRANSLATIONS.en;
  const isRtl = lang === "ar";

  useEffect(() => {
    if (!isLoading && isAuthenticated) setLocation("/dashboard");
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading || isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden" dir={isRtl ? "rtl" : "ltr"}>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%  { transform: translateY(-10px) rotate(3deg); }
          66%  { transform: translateY(5px)   rotate(-2deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .text-shimmer {
          background: linear-gradient(90deg, #1d4ed8 0%, #7c3aed 40%, #0ea5e9 60%, #1d4ed8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      {/* ── Nav ── */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-gray-900 tracking-tight">Invest Plus</span>
        </div>
        <div className="flex items-center gap-1">
          {/* Language picker */}
          <LangPicker lang={lang} setLang={setLang} />
          <Link href="/about">
            <button className="text-sm font-medium text-gray-500 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors hidden sm:block">
              {t.about}
            </button>
          </Link>
          <Link href="/login">
            <button className="text-sm font-medium text-gray-600 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors">
              {t.signIn}
            </button>
          </Link>
          <Link href="/register">
            <button className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-sm">
              {t.getStarted}
            </button>
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center text-center px-6 pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(ellipse, #2563eb 0%, transparent 70%)" }} />
        </div>

        {/* More coin orbs — 12 coins */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <CoinOrb slug="btc"   size={44} x="7%"   y="10%"  delay="0s"    />
          <CoinOrb slug="eth"   size={34} x="82%"  y="7%"   delay="1.2s"  />
          <CoinOrb slug="bnb"   size={28} x="88%"  y="32%"  delay="0.6s"  />
          <CoinOrb slug="trx"   size={24} x="5%"   y="40%"  delay="1.8s"  />
          <CoinOrb slug="usdt"  size={38} x="78%"  y="60%"  delay="0.3s"  />
          <CoinOrb slug="xrp"   size={30} x="12%"  y="68%"  delay="2.1s"  />
          <CoinOrb slug="sol"   size={36} x="70%"  y="82%"  delay="0.9s"  />
          <CoinOrb slug="doge"  size={26} x="3%"   y="80%"  delay="1.5s"  />
          <CoinOrb slug="ada"   size={22} x="90%"  y="72%"  delay="2.4s"  />
          <CoinOrb slug="matic" size={20} x="55%"  y="5%"   delay="0.4s"  />
          <CoinOrb slug="dot"   size={24} x="40%"  y="88%"  delay="1.1s"  />
          <CoinOrb slug="avax"  size={28} x="60%"  y="75%"  delay="1.7s"  />
        </div>

        <div className="relative z-[1] max-w-xl">
          <h1 className="text-5xl sm:text-6xl font-black leading-[1.05] tracking-tight mb-5">
            {t.hero1}
            <br />
            <span className="text-shimmer">{t.hero2}</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-sm mx-auto mb-10 leading-relaxed">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <button className="group bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-blue-200 active:scale-95">
                {t.openWallet}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/plans">
              <button className="bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-2xl border border-gray-200 hover:bg-gray-100 transition-colors active:scale-95">
                {t.viewPlans}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Live ticker ── */}
      <section className="bg-gray-950 text-white py-3.5 overflow-hidden relative">
        <div className="flex gap-10 animate-[marquee_28s_linear_infinite] whitespace-nowrap">
          {[
            { sym: "BTC",  price: "64,179", chg: "-2.34%", up: false },
            { sym: "ETH",  price: "3,440",  chg: "+1.87%", up: true  },
            { sym: "BNB",  price: "605",    chg: "+3.21%", up: true  },
            { sym: "XRP",  price: "0.5214", chg: "+4.56%", up: true  },
            { sym: "SOL",  price: "143.20", chg: "+5.12%", up: true  },
            { sym: "USDT", price: "1.00",   chg: "+0.01%", up: true  },
            { sym: "DOGE", price: "0.1204", chg: "+6.88%", up: true  },
            { sym: "ADA",  price: "0.3921", chg: "-1.73%", up: false },
            { sym: "TRX",  price: "0.2814", chg: "-0.94%", up: false },
            { sym: "DOT",  price: "6.84",   chg: "-3.07%", up: false },
            { sym: "AVAX", price: "26.14",  chg: "+4.22%", up: true  },
            { sym: "MATIC",price: "0.4817", chg: "-2.44%", up: false },
            { sym: "LINK", price: "13.05",  chg: "+2.91%", up: true  },
            { sym: "SHIB", price: "0.0000178", chg: "+7.31%", up: true },
            // duplicate for seamless loop
            { sym: "BTC",  price: "64,179", chg: "-2.34%", up: false },
            { sym: "ETH",  price: "3,440",  chg: "+1.87%", up: true  },
            { sym: "BNB",  price: "605",    chg: "+3.21%", up: true  },
            { sym: "XRP",  price: "0.5214", chg: "+4.56%", up: true  },
            { sym: "SOL",  price: "143.20", chg: "+5.12%", up: true  },
            { sym: "USDT", price: "1.00",   chg: "+0.01%", up: true  },
            { sym: "DOGE", price: "0.1204", chg: "+6.88%", up: true  },
            { sym: "ADA",  price: "0.3921", chg: "-1.73%", up: false },
          ].map((t, i) => (
            <span key={i} className="flex items-center gap-2 text-sm font-semibold flex-shrink-0">
              <span className="text-gray-400">{t.sym}</span>
              <span>${t.price}</span>
              <span className={t.up ? "text-green-400" : "text-red-400"}>{t.chg}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-gradient-to-r from-blue-600 to-violet-600 py-10 px-6">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-6 text-center text-white">
          {[
            { label: t.statRoi,   value: 52,    suffix: "%" },
            { label: t.statUsers, value: 50000, suffix: "+" },
            { label: t.statCoins, value: 100,   suffix: "+" },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-black">
                <AnimatedStat target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-blue-200 font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-md mx-auto">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest text-center mb-2">{t.howTitle}</p>
          <h2 className="text-2xl font-black text-gray-900 text-center mb-10">{t.howSub}</h2>
          <div className="space-y-4">
            {[
              { step: "01", title: t.step1Title, desc: t.step1Desc, icon: <Lock className="w-5 h-5 text-blue-600" />,   bg: "bg-blue-50"   },
              { step: "02", title: t.step2Title, desc: t.step2Desc, icon: <ArrowUpRight className="w-5 h-5 text-green-600" />, bg: "bg-green-50" },
              { step: "03", title: t.step3Title, desc: t.step3Desc, icon: <TrendingUp className="w-5 h-5 text-violet-600" />, bg: "bg-violet-50" },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-0.5">{t.stepLabel} {item.step}</div>
                  <div className="font-bold text-gray-900 mb-1">{item.title}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="bg-gray-50 border-t border-gray-100 px-6 py-16">
        <div className="max-w-md mx-auto">
          <p className="text-xs font-bold text-violet-600 uppercase tracking-widest text-center mb-2">{t.plansTitle}</p>
          <h2 className="text-2xl font-black text-gray-900 text-center mb-2">{t.plansSub}</h2>
          <p className="text-sm text-gray-400 text-center mb-8">{t.plansDesc}</p>
          <div className="space-y-3">
            {[
              { name: "Starter", roi: "12.5%", days: 30, min: "$500",    tag: null,           from: "#2563eb", to: "#3b82f6" },
              { name: "Growth",  roi: "28%",   days: 60, min: "$5,000",  tag: t.mostPopular,  from: "#7c3aed", to: "#a78bfa" },
              { name: "Elite",   roi: "52%",   days: 90, min: "$50,000", tag: t.bestRoi,      from: "#d97706", to: "#fbbf24" },
            ].map(plan => (
              <div key={plan.name}
                className="relative flex items-center justify-between p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden group"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                  style={{ background: `linear-gradient(to bottom, ${plan.from}, ${plan.to})` }} />
                <div className="pl-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{plan.name}</span>
                    {plan.tag && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white uppercase"
                        style={{ background: `linear-gradient(135deg, ${plan.from}, ${plan.to})` }}>
                        {plan.tag}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{plan.days} {t.daysLabel} · {t.minLabel} {plan.min}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-2xl font-black"
                      style={{ background: `linear-gradient(135deg, ${plan.from}, ${plan.to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      {plan.roi}
                    </div>
                    <div className="text-[10px] text-gray-400">{t.roiLabel}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/register">
              <button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold px-8 py-3.5 rounded-2xl hover:opacity-90 transition-opacity shadow-sm active:scale-95">
                {t.startEarning}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-white border-t border-gray-100 px-6 py-16">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-8">{t.featTitle}</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Shield className="w-5 h-5 text-blue-600" />,     bg: "bg-blue-50",   title: t.feat1Title, desc: t.feat1Desc },
              { icon: <Zap className="w-5 h-5 text-amber-500" />,       bg: "bg-amber-50",  title: t.feat2Title, desc: t.feat2Desc },
              { icon: <RefreshCw className="w-5 h-5 text-green-600" />, bg: "bg-green-50",  title: t.feat3Title, desc: t.feat3Desc },
              { icon: <Sparkles className="w-5 h-5 text-violet-600" />, bg: "bg-violet-50", title: t.feat4Title, desc: t.feat4Desc },
            ].map(f => (
              <div key={f.title} className="p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-3`}>{f.icon}</div>
                <div className="font-bold text-gray-900 text-sm mb-1">{f.title}</div>
                <div className="text-xs text-gray-400 leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-10 bg-gray-950">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-green-400 text-xs font-semibold">{t.ctaLive}</span>
          </div>
          <h2 className="text-2xl font-black text-white mb-3">{t.ctaTitle}</h2>
          <p className="text-sm text-gray-400 mb-6">{t.ctaSub}</p>
          <Link href="/register">
            <button className="bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg active:scale-95">
              {t.ctaBtn}
            </button>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 border-t border-gray-800 px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-black text-white text-sm tracking-tight">Invest Plus</span>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500 mb-5">
            <Link href="/about" className="hover:text-white transition-colors font-medium">{t.about}</Link>
            <Link href="/terms" className="hover:text-white transition-colors font-medium">Terms & Policy</Link>
            <Link href="/login" className="hover:text-white transition-colors font-medium">{t.signIn}</Link>
            <Link href="/register" className="hover:text-white transition-colors font-medium">{t.getStarted}</Link>
          </div>
          <p className="text-xs text-gray-600 text-center">© 2026 Invest Plus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
