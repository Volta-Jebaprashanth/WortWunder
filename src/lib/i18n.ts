// Translations for the app's own instructional UI text (menus, buttons,
// exercise prompts). The German lesson content itself (titles like
// "Was ist das?", words like "der Vogel", playful headers like "Los geht's!")
// is intentionally left in German everywhere — it's the language being
// taught, not the UI chrome — so it isn't part of this table.
export type MotherTongue = "english" | "tamil" | "sinhala";

export const MOTHER_TONGUES: { value: MotherTongue; label: string }[] = [
  { value: "english", label: "English" },
  { value: "tamil", label: "தமிழ்" },
  { value: "sinhala", label: "සිංහල" },
];

export interface Strings {
  openProfileMenu: string;
  closeMenu: string;
  previousScreen: string;
  gems: string;
  sparks: string;
  addToHomeScreen: string;
  readyForAdventure: string;
  todaysGoal: string;
  lessonComplete: (xp: number) => string;
  wordsStartHere: (count: number) => string;
  wordsLocked: (count: number) => string;
  dailyTimeProgress: (done: string, total: string) => string;
  dailyGoalReached: string;
  whoAreYouSubtitle: string;
  nameLabel: string;
  ageLabel: string;
  motherTongueLabel: string;
  namePlaceholder: string;
  agePlaceholder: string;
  aboutMe: string;
  save: string;
  clearAllData: string;
  deleteEverythingTitle: string;
  deleteEverythingBody: string;
  cancel: string;
  yesDelete: string;
  followStepsGrownUp: string;
  openInSafariStep: string;
  tapShareStep: string;
  addToHomeScreenStep: string;
  tapAddStep: string;
  findIconStep: string;
  openInSafari: string;
  gotIt: string;
  pictureChallenge: string;
  wordPictureChallenge: string;
  meaningCheck: string;
  translationChallenge: string;
  articleChallenge: string;
  wordBuilder: string;
  missingLetter: string;
  unscramble: string;
  listeningChallenge: string;
  roundUp: string;
  training: string;
  learnNewWord: string;
  exampleSentence: string;
  plural: string;
  chooseGermanWordForPicture: string;
  chooseGermanPictureForWord: string;
  chooseMeaning: string;
  chooseGermanWord: string;
  chooseCorrectArticle: string;
  tapLettersToSpell: string;
  pickLetterThatCompletes: string;
  arrangeLetters: string;
  listenThenChoose: string;
  listenThenTapPicture: string;
  listenThenSpell: string;
  matchWordsToMeaning: string;
  matchChallenge: string;
  listenAgain: string;
  check: string;
  tryAgain: string;
  youChose: string;
  youWrote: string;
  correctSpelling: string;
  resetLetters: string;
  openKeyboard: string;
  playGermanWord: string;
  tapToHear: (text: string) => string;
  correctMeaning: (word: string, meaning: string) => string;
  hintBird: string;
  hintGeneric: string;
  roundSuccess: string;
  resultSummary: (questions: number, mistakes: number) => string;
  backToPath: string;
  expandSection: string;
  collapseSection: string;
  // Grammar tests (GrammarQuiz.tsx)
  levelWord: string;
  levelNames: [string, string, string, string];
  levelLines: [string, string, string, string];
  hint: string;
  hintNote: string;
  warmUp: string;
  fromLastTime: string;
  pause: string;
  pauseLine: string;
  remember: string;
  sayItAfterMe: string;
  listenThenSay: string;
  hearAgain: string;
  slowly: string;
  iSaidIt: string;
  skip: string;
  playAll: string;
  playAgain: string;
  playScene: string;
  answerWas: (answer: string) => string;
  you: string;
  soundN: (n: number) => string;
  tapSoundToChoose: string;
  turnOf: (turn: number, total: number) => string;
  // Level popup before a completed test (or any test, for the test profile)
  pickLevelTitle: string;
  pickLevelBody: string;
  continueWhereLeft: string;
  vocabLevelNames: [string, string, string, string, string];
  typeHere: string;
  tapToPlace: string;
  starsLabel: (stars: number) => string;
}

export const TRANSLATIONS: Record<MotherTongue, Strings> = {
  english: {
    openProfileMenu: "Open profile menu",
    closeMenu: "Close menu",
    previousScreen: "Previous screen",
    gems: "diamonds",
    sparks: "sparks",
    addToHomeScreen: "Add to Home Screen",
    readyForAdventure: "Ready for a little German adventure?",
    todaysGoal: "TODAY'S GOAL",
    lessonComplete: (xp) => `Complete · ${xp} XP`,
    wordsStartHere: (count) => `${count} words · Start here`,
    wordsLocked: (count) => `${count} words · Locked`,
    dailyTimeProgress: (done, total) => `${done} / ${total}`,
    dailyGoalReached: "Target achieved! Good luck!",
    whoAreYouSubtitle: "Tell us your name and age to start learning!",
    nameLabel: "Name",
    ageLabel: "Age",
    motherTongueLabel: "Mother tongue",
    namePlaceholder: "e.g. Leni",
    agePlaceholder: "e.g. 7",
    aboutMe: "About me",
    save: "Save",
    clearAllData: "Clear all my data",
    deleteEverythingTitle: "Delete everything?",
    deleteEverythingBody: "This will erase your name, age, and progress. You can't undo this.",
    cancel: "Cancel",
    yesDelete: "Yes, delete",
    followStepsGrownUp: "Follow these steps with a grown-up!",
    openInSafariStep: "Open this page in Safari — tap the button below.",
    tapShareStep: "Tap the Share button (square with an arrow ⬆️) at the bottom of the screen.",
    addToHomeScreenStep: 'Scroll down the menu and tap "Add to Home Screen".',
    tapAddStep: 'Tap "Add" in the top-right corner.',
    findIconStep: "Find the WortWunder icon on your Home Screen and tap it to play!",
    openInSafari: "Open in Safari",
    gotIt: "Got it",
    pictureChallenge: "Picture challenge",
    wordPictureChallenge: "Word to picture",
    meaningCheck: "Meaning check",
    translationChallenge: "Translation",
    articleChallenge: "Der, die, or das?",
    wordBuilder: "Word builder",
    missingLetter: "Missing letter",
    unscramble: "Unscramble",
    listeningChallenge: "Listening challenge",
    roundUp: "Round-up",
    training: "Training",
    learnNewWord: "Look, listen and remember this new word.",
    exampleSentence: "Example",
    plural: "Plural",
    chooseGermanWordForPicture: "Choose the German word for this picture.",
    chooseGermanPictureForWord: "Choose the picture for this German word.",
    chooseMeaning: "Choose the meaning.",
    chooseGermanWord: "Choose the German word.",
    chooseCorrectArticle: "Choose the correct article.",
    tapLettersToSpell: "Tap the letters to spell the German word.",
    pickLetterThatCompletes: "Pick the letter that completes the word.",
    arrangeLetters: "Arrange the letters to spell the word.",
    listenThenChoose: "Listen, then choose the word you hear.",
    listenThenTapPicture: "Listen, then tap the matching picture.",
    listenThenSpell: "Listen, then spell the word you hear.",
    matchWordsToMeaning: "Match each German word to its meaning.",
    matchChallenge: "Matching game",
    listenAgain: "Listen again as many times as you like.",
    check: "Check",
    tryAgain: "Try again",
    youChose: "You chose",
    youWrote: "You wrote",
    correctSpelling: "Correct spelling",
    resetLetters: "Reset letters",
    openKeyboard: "Type with the keyboard",
    playGermanWord: "Play German word",
    tapToHear: (text) => `${text} — tap to hear`,
    correctMeaning: (word, meaning) => `${word} = ${meaning}!`,
    hintBird: "Hint: this animal has feathers and loves to sing.",
    hintGeneric: "Hint: listen to the word again and think about the picture.",
    roundSuccess: "Great job! You finished this test.",
    resultSummary: (questions, mistakes) =>
      `${questions} questions · ${mistakes === 0 ? "no mistakes" : mistakes === 1 ? "1 mistake" : `${mistakes} mistakes`}`,
    backToPath: "Back to my path",
    expandSection: "Expand",
    collapseSection: "Collapse",
    levelWord: "Level",
    levelNames: ["Training", "Simple", "Medium", "Hard"],
    levelLines: [
      "Look, listen, remember.",
      "Choose the right one.",
      "Remember it yourself.",
      "No help now. You can do it!",
    ],
    hint: "Hint",
    hintNote: "Using a hint means this one comes back once more.",
    warmUp: "Warm-up",
    fromLastTime: "From last time",
    pause: "Pause",
    pauseLine: "Let's look at this again together.",
    remember: "Merke · Remember",
    sayItAfterMe: "Say it after me",
    listenThenSay: "Listen, then say it out loud.",
    hearAgain: "Hear it again",
    slowly: "Slowly",
    iSaidIt: "I said it!",
    skip: "Skip",
    playAll: "Play all",
    playAgain: "Play again",
    playScene: "Play the scene",
    answerWas: (answer) => `The answer: ${answer}`,
    you: "You",
    soundN: (n) => `Sound ${n}`,
    tapSoundToChoose: "Tap a sound to hear it and choose it.",
    turnOf: (turn, total) => `turn ${turn} of ${total}`,
    pickLevelTitle: "Practise again",
    pickLevelBody: "Which level do you want to practise?",
    continueWhereLeft: "Continue where I left off",
    vocabLevelNames: ["Training", "Basic", "Easy", "Medium", "Hard"],
    typeHere: "Type here",
    tapToPlace: "Tap a tile, then tap where it goes.",
    starsLabel: (stars) => `${stars} of 3 stars`,
  },
  tamil: {
    openProfileMenu: "சுயவிவரப் பட்டியலைத் திற",
    closeMenu: "பட்டியலை மூடு",
    previousScreen: "முந்தைய திரை",
    gems: "வைரங்கள்",
    sparks: "தீப்பொறிகள்",
    addToHomeScreen: "முகப்புத் திரையில் சேர்",
    readyForAdventure: "ஜெர்மன் மொழி சாகசத்திற்குத் தயாரா?",
    todaysGoal: "இன்றைய இலக்கு",
    lessonComplete: (xp) => `முடிந்தது · ${xp} XP`,
    wordsStartHere: (count) => `${count} சொற்கள் · இங்கிருந்து தொடங்கு`,
    wordsLocked: (count) => `${count} சொற்கள் · பூட்டப்பட்டது`,
    dailyTimeProgress: (done, total) => `${done} / ${total}`,
    dailyGoalReached: "இலக்கை அடைந்துவிட்டாய்! வாழ்த்துகள்!",
    whoAreYouSubtitle: "கற்றலைத் தொடங்க உங்கள் பெயரையும் வயதையும் சொல்லுங்கள்!",
    nameLabel: "பெயர்",
    ageLabel: "வயது",
    motherTongueLabel: "தாய்மொழி",
    namePlaceholder: "எ.கா. லெனி",
    agePlaceholder: "எ.கா. 7",
    aboutMe: "என்னைப் பற்றி",
    save: "சேமி",
    clearAllData: "என் தரவு அனைத்தையும் அழி",
    deleteEverythingTitle: "அனைத்தையும் நீக்கவா?",
    deleteEverythingBody:
      "இது உங்கள் பெயர், வயது மற்றும் முன்னேற்றத்தை அழிக்கும். இதை மீட்க முடியாது.",
    cancel: "ரத்து செய்",
    yesDelete: "ஆம், நீக்கு",
    followStepsGrownUp: "பெரியவர் ஒருவருடன் இந்த வழிமுறைகளைப் பின்பற்றுங்கள்!",
    openInSafariStep: "இந்தப் பக்கத்தை Safari-இல் திற — கீழேயுள்ள பொத்தானைத் தட்டவும்.",
    tapShareStep: "திரையின் கீழே உள்ள Share பொத்தானை (அம்பு உள்ள சதுரம் ⬆️) தட்டவும்.",
    addToHomeScreenStep: 'பட்டியலில் கீழே சென்று "முகப்புத் திரையில் சேர்" என்பதைத் தட்டவும்.',
    tapAddStep: 'மேல்-வலது மூலையில் "சேர்" என்பதைத் தட்டவும்.',
    findIconStep: "உங்கள் முகப்புத் திரையில் WortWunder ஐகானைக் கண்டுபிடித்து விளையாட தட்டவும்!",
    openInSafari: "Safari-இல் திற",
    gotIt: "சரி, புரிந்தது",
    pictureChallenge: "படச் சவால்",
    wordPictureChallenge: "சொல் - படச் சவால்",
    meaningCheck: "பொருள் சோதனை",
    translationChallenge: "மொழிபெயர்ப்பு",
    articleChallenge: "der, die அல்லது das?",
    wordBuilder: "சொல் கட்டமைப்பான்",
    missingLetter: "விடுபட்ட எழுத்து",
    unscramble: "எழுத்துக்களை வரிசைப்படுத்து",
    listeningChallenge: "கேட்டல் சவால்",
    roundUp: "இறுதிச் சுற்று",
    training: "பயிற்சி",
    learnNewWord: "இந்தப் புதிய சொல்லைப் பார், கேள், நினைவில் வை.",
    exampleSentence: "உதாரணம்",
    plural: "பன்மை",
    chooseGermanWordForPicture: "இந்தப் படத்திற்கான ஜெர்மன் சொல்லைத் தேர்ந்தெடு.",
    chooseGermanPictureForWord: "இந்த ஜெர்மன் சொல்லுக்கான படத்தைத் தேர்ந்தெடு.",
    chooseMeaning: "பொருளைத் தேர்ந்தெடு.",
    chooseGermanWord: "ஜெர்மன் சொல்லைத் தேர்ந்தெடு.",
    chooseCorrectArticle: "சரியான பண்புச்சொல்லைத் தேர்ந்தெடு.",
    tapLettersToSpell: "ஜெர்மன் சொல்லை எழுத எழுத்துக்களைத் தட்டவும்.",
    pickLetterThatCompletes: "சொல்லை நிறைவு செய்யும் எழுத்தைத் தேர்ந்தெடு.",
    arrangeLetters: "சொல்லை உருவாக்க எழுத்துக்களை வரிசைப்படுத்து.",
    listenThenChoose: "கேளுங்கள், பிறகு நீங்கள் கேட்ட சொல்லைத் தேர்ந்தெடுங்கள்.",
    listenThenTapPicture: "கேளுங்கள், பிறகு பொருந்தும் படத்தைத் தட்டவும்.",
    listenThenSpell: "கேளுங்கள், பிறகு நீங்கள் கேட்ட சொல்லை எழுதுங்கள்.",
    matchWordsToMeaning: "ஒவ்வொரு ஜெர்மன் சொல்லையும் அதன் பொருளுடன் இணைக்கவும்.",
    matchChallenge: "பொருத்தும் விளையாட்டு",
    listenAgain: "நீங்கள் விரும்பும் அளவுக்கு மீண்டும் கேளுங்கள்.",
    check: "சரிபார்",
    tryAgain: "மீண்டும் முயற்சி செய்",
    youChose: "நீங்கள் தேர்ந்தெடுத்தது",
    youWrote: "நீங்கள் எழுதியது",
    correctSpelling: "சரியான எழுத்துக்கூட்டல்",
    resetLetters: "எழுத்துக்களை மீட்டமை",
    openKeyboard: "விசைப்பலகையில் தட்டச்சு செய்",
    playGermanWord: "ஜெர்மன் சொல்லைக் கேள்",
    tapToHear: (text) => `${text} — கேட்க தட்டவும்`,
    correctMeaning: (word, meaning) => `${word} = ${meaning}!`,
    hintBird: "குறிப்பு: இந்த விலங்கிற்கு இறகுகள் உண்டு, பாட விரும்பும்.",
    hintGeneric: "குறிப்பு: சொல்லை மீண்டும் கேட்டு படத்தைப் பற்றி யோசி.",
    roundSuccess: "அருமை! இந்தச் சோதனையை முடித்துவிட்டாய்.",
    resultSummary: (questions, mistakes) =>
      `${questions} கேள்விகள் · ${mistakes === 0 ? "தவறு இல்லை" : `${mistakes} தவறுகள்`}`,
    backToPath: "என் பாதைக்குத் திரும்பு",
    expandSection: "விரிவாக்கு",
    collapseSection: "சுருக்கு",
    levelWord: "நிலை",
    levelNames: ["பயிற்சி", "எளிது", "நடுத்தரம்", "கடினம்"],
    levelLines: [
      "பார், கேள், நினைவில் வை.",
      "சரியானதைத் தேர்ந்தெடு.",
      "நீயே நினைவுகூர்.",
      "இப்போது உதவி இல்லை. உன்னால் முடியும்!",
    ],
    hint: "குறிப்பு",
    hintNote: "குறிப்பைப் பயன்படுத்தினால் இந்தக் கேள்வி இன்னொரு முறை வரும்.",
    warmUp: "தயார்ப் பயிற்சி",
    fromLastTime: "கடந்த முறையிலிருந்து",
    pause: "இடைவேளை",
    pauseLine: "இதை மீண்டும் ஒன்றாகப் பார்ப்போம்.",
    remember: "Merke · நினைவில் வை",
    sayItAfterMe: "என்னைப் பின்தொடர்ந்து சொல்",
    listenThenSay: "கேள், பிறகு சத்தமாகச் சொல்.",
    hearAgain: "மீண்டும் கேள்",
    slowly: "மெதுவாக",
    iSaidIt: "நான் சொன்னேன்!",
    skip: "தவிர்",
    playAll: "எல்லாவற்றையும் இயக்கு",
    playAgain: "மீண்டும் இயக்கு",
    playScene: "காட்சியை இயக்கு",
    answerWas: (answer) => `விடை: ${answer}`,
    you: "நீ",
    soundN: (n) => `ஒலி ${n}`,
    tapSoundToChoose: "ஒலியைத் தட்டிக் கேட்டுத் தேர்ந்தெடு.",
    turnOf: (turn, total) => `${total} இல் ${turn}`,
    pickLevelTitle: "மீண்டும் பயிற்சி செய்",
    pickLevelBody: "எந்த நிலையைப் பயிற்சி செய்ய விரும்புகிறாய்?",
    continueWhereLeft: "விட்ட இடத்திலிருந்து தொடர்",
    vocabLevelNames: ["பயிற்சி", "அடிப்படை", "எளிது", "நடுத்தரம்", "கடினம்"],
    typeHere: "இங்கே தட்டச்சு செய்",
    tapToPlace: "ஒரு ஓடுவைத் தட்டி, அது போகும் இடத்தைத் தட்டு.",
    starsLabel: (stars) => `3 இல் ${stars} நட்சத்திரங்கள்`,
  },
  sinhala: {
    openProfileMenu: "පැතිකඩ මෙනුව විවෘත කරන්න",
    closeMenu: "මෙනුව වසන්න",
    previousScreen: "පෙර තිරය",
    gems: "දියමන්ති",
    sparks: "ගිනි පුපුරු",
    addToHomeScreen: "මුල් තිරයට එකතු කරන්න",
    readyForAdventure: "ජර්මානු කුඩා වික්‍රමයකට සූදානම්ද?",
    todaysGoal: "අද දිනයේ ඉලක්කය",
    lessonComplete: (xp) => `සම්පූර්ණයි · ${xp} XP`,
    wordsStartHere: (count) => `වචන ${count} · මෙතනින් පටන් ගන්න`,
    wordsLocked: (count) => `වචන ${count} · අගුලු දමා ඇත`,
    dailyTimeProgress: (done, total) => `${done} / ${total}`,
    dailyGoalReached: "ඉලක්කය සපුරා ගත්තා! සුබ පැතුම්!",
    whoAreYouSubtitle: "ඉගෙනීම ආරම්භ කිරීමට ඔබේ නම සහ වයස කියන්න!",
    nameLabel: "නම",
    ageLabel: "වයස",
    motherTongueLabel: "මව් භාෂාව",
    namePlaceholder: "උදා. ලෙනි",
    agePlaceholder: "උදා. 7",
    aboutMe: "මා ගැන",
    save: "සුරකින්න",
    clearAllData: "මගේ දත්ත සියල්ල මකන්න",
    deleteEverythingTitle: "සියල්ල මකන්නද?",
    deleteEverythingBody: "මෙයින් ඔබේ නම, වයස සහ ප්‍රගතිය මකා දමනු ඇත. මෙය අහෝසි කළ නොහැක.",
    cancel: "අවලංගු කරන්න",
    yesDelete: "ඔව්, මකන්න",
    followStepsGrownUp: "වැඩිහිටියෙකු සමඟ මෙම පියවර අනුගමනය කරන්න!",
    openInSafariStep: "මෙම පිටුව Safari හි විවෘත කරන්න — පහත බොත්තම ඔබන්න.",
    tapShareStep: "තිරයේ පහළින් ඇති Share බොත්තම (ඊතලයක් සහිත සතරැස්‍රය ⬆️) ඔබන්න.",
    addToHomeScreenStep: 'මෙනුවේ පහළට ගොස් "මුල් තිරයට එකතු කරන්න" ඔබන්න.',
    tapAddStep: 'ඉහළ-දකුණේ ඇති "එකතු කරන්න" ඔබන්න.',
    findIconStep: "ඔබේ මුල් තිරයේ WortWunder අයිකනය සොයාගෙන එය ඔබා ක්‍රීඩා කරන්න!",
    openInSafari: "Safari හි විවෘත කරන්න",
    gotIt: "තේරුණා",
    pictureChallenge: "පින්තූර අභියෝගය",
    wordPictureChallenge: "වචන-පින්තූර අභියෝගය",
    meaningCheck: "අර්ථය පරීක්ෂාව",
    translationChallenge: "පරිවර්තනය",
    articleChallenge: "der, die නැතහොත් das?",
    wordBuilder: "වචන තැනීම",
    missingLetter: "අස්ථානගත අකුර",
    unscramble: "අකුරු පිළිවෙළට සකසන්න",
    listeningChallenge: "ශ්‍රවණ අභියෝගය",
    roundUp: "අවසාන වටය",
    training: "පුහුණුව",
    learnNewWord: "මෙම නව වචනය බලන්න, අහන්න, මතක තබා ගන්න.",
    exampleSentence: "උදාහරණය",
    plural: "බහුවචනය",
    chooseGermanWordForPicture: "මෙම පින්තූරයට ගැලපෙන ජර්මානු වචනය තෝරන්න.",
    chooseGermanPictureForWord: "මෙම ජර්මානු වචනයට ගැලපෙන පින්තූරය තෝරන්න.",
    chooseMeaning: "අර්ථය තෝරන්න.",
    chooseGermanWord: "ජර්මානු වචනය තෝරන්න.",
    chooseCorrectArticle: "නිවැරදි ලිපිය තෝරන්න.",
    tapLettersToSpell: "ජර්මන් වචනය ලිවීමට අකුරු ඔබන්න.",
    pickLetterThatCompletes: "වචනය සම්පූර්ණ කරන අකුර තෝරන්න.",
    arrangeLetters: "වචනය සෑදීමට අකුරු පිළිවෙළට සකසන්න.",
    listenThenChoose: "අහන්න, පසුව ඔබ ඇසූ වචනය තෝරන්න.",
    listenThenTapPicture: "අහන්න, පසුව ගැලපෙන පින්තූරය ඔබන්න.",
    listenThenSpell: "අහන්න, පසුව ඔබ ඇසූ වචනය ලියන්න.",
    matchWordsToMeaning: "සෑම ජර්මානු වචනයක්ම එහි අර්ථයට ගළපන්න.",
    matchChallenge: "ගැලපීමේ ක්‍රීඩාව",
    listenAgain: "ඔබට කැමති තරම් නැවත අහන්න.",
    check: "පරීක්ෂා කරන්න",
    tryAgain: "නැවත උත්සාහ කරන්න",
    youChose: "ඔබ තෝරාගත්තේ",
    youWrote: "ඔබ ලිව්වේ",
    correctSpelling: "නිවැරදි අක්ෂර වින්‍යාසය",
    resetLetters: "අකුරු යළි සකසන්න",
    openKeyboard: "යතුරුපුවරුවෙන් ටයිප් කරන්න",
    playGermanWord: "ජර්මානු වචනය ඇසෙන්න",
    tapToHear: (text) => `${text} — ඇසීමට ඔබන්න`,
    correctMeaning: (word, meaning) => `${word} = ${meaning}!`,
    hintBird: "ඉඟිය: මෙම සතාට පිහාටු ඇති අතර ගායනා කිරීමට කැමතියි.",
    hintGeneric: "ඉඟිය: වචනය නැවත අසා පින්තූරය ගැන සිතන්න.",
    roundSuccess: "නියමයි! ඔබ මෙම පරීක්ෂණය අවසන් කළා.",
    resultSummary: (questions, mistakes) =>
      `ප්‍රශ්න ${questions} · ${mistakes === 0 ? "වැරදි නැත" : `වැරදි ${mistakes}`}`,
    backToPath: "මගේ මාවතට ආපසු",
    expandSection: "විස්තීරණය කරන්න",
    collapseSection: "හකුළන්න",
    levelWord: "මට්ටම",
    levelNames: ["පුහුණුව", "සරල", "මධ්‍යම", "අමාරු"],
    levelLines: [
      "බලන්න, අහන්න, මතක තබාගන්න.",
      "හරි එක තෝරන්න.",
      "ඔබම මතක් කරන්න.",
      "දැන් උදව් නැහැ. ඔබට පුළුවන්!",
    ],
    hint: "ඉඟිය",
    hintNote: "ඉඟියක් භාවිත කළොත් මේ ප්‍රශ්නය තව වරක් එනවා.",
    warmUp: "උණුසුම් කිරීම",
    fromLastTime: "පසුගිය වතාවෙන්",
    pause: "විවේකය",
    pauseLine: "අපි මේක ආයෙත් එකට බලමු.",
    remember: "Merke · මතක තබාගන්න",
    sayItAfterMe: "මට පස්සේ කියන්න",
    listenThenSay: "අහලා, ඊට පස්සේ හයියෙන් කියන්න.",
    hearAgain: "ආයෙත් අහන්න",
    slowly: "හෙමින්",
    iSaidIt: "මම කිව්වා!",
    skip: "මඟහරින්න",
    playAll: "සියල්ල වාදනය කරන්න",
    playAgain: "ආයෙත් වාදනය කරන්න",
    playScene: "දර්ශනය වාදනය කරන්න",
    answerWas: (answer) => `පිළිතුර: ${answer}`,
    you: "ඔබ",
    soundN: (n) => `ශබ්දය ${n}`,
    tapSoundToChoose: "ශබ්දයක් තට්ටු කර අහලා තෝරන්න.",
    turnOf: (turn, total) => `${total} න් ${turn}`,
    pickLevelTitle: "ආයෙත් පුහුණු වෙන්න",
    pickLevelBody: "ඔබට පුහුණු වෙන්න ඕනෙ කුමන මට්ටමද?",
    continueWhereLeft: "නැවැත්තූ තැන ඉඳන් යන්න",
    vocabLevelNames: ["පුහුණුව", "මූලික", "පහසු", "මධ්‍යම", "අමාරු"],
    typeHere: "මෙතන ටයිප් කරන්න",
    tapToPlace: "ටයිල් එකක් තට්ටු කර, එය යන තැන තට්ටු කරන්න.",
    starsLabel: (stars) => `තරු 3 න් ${stars}`,
  },
};
