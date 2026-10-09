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
  startLesson: string;
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
  tapLettersToSpell: (word: string) => string;
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
  resetLetters: string;
  openKeyboard: string;
  playGermanWord: string;
  tapToHear: (text: string) => string;
  correctMeaning: (word: string, meaning: string) => string;
  hintBird: string;
  hintGeneric: string;
  roundSuccess: string;
  backToPath: string;
  expandSection: string;
  collapseSection: string;
  comingSoon: string;
  moreLessons: string;
  tip: string;
  buildMeaning: string;
  buildGerman: string;
  listenBuildSentence: string;
  listenPickMeaning: string;
  playSentence: string;
  playSlowly: string;
  exitLesson: string;
  correctAnswer: string;
  lessonScore: (right: number, total: number) => string;
  locked: string;
  grammarChallenge: string;
  fillGap: string;
  orderWords: string;
  typeGerman: string;
  listenTypeSentence: string;
  typeHere: string;
  almostRight: string;
  mindSpecialLetters: string;
  guidebook: string;
  guidebookHint: string;
  unitGoals: string;
  lessons: string;
  checkpoint: string;
  checkpointIntro: (questions: number, percent: number) => string;
  skipAhead: string;
  startCheckpoint: string;
  checkpointPassed: string;
  checkpointFailed: string;
  checkpointScore: (right: number, total: number) => string;
  backToUnit: string;
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
    startLesson: "Start lesson",
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
    tapLettersToSpell: (word) => `Tap the letters to spell ${word}.`,
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
    resetLetters: "Reset letters",
    openKeyboard: "Type with the keyboard",
    playGermanWord: "Play German word",
    tapToHear: (text) => `${text} — tap to hear`,
    correctMeaning: (word, meaning) => `${word} = ${meaning}!`,
    hintBird: "Hint: this animal has feathers and loves to sing.",
    hintGeneric: "Hint: listen to the word again and think about the picture.",
    roundSuccess: "Great job! You finished this lesson.",
    backToPath: "Back to my path",
    expandSection: "Expand",
    collapseSection: "Collapse",
    comingSoon: "Coming soon",
    moreLessons: "More lessons",
    tip: "Tip",
    buildMeaning: "Tap the words to build the meaning.",
    buildGerman: "Tap the words to build the German sentence.",
    listenBuildSentence: "Listen, then tap the words you hear.",
    listenPickMeaning: "Listen, then choose the meaning.",
    playSentence: "Play the sentence",
    playSlowly: "Play slowly",
    exitLesson: "Leave the lesson",
    correctAnswer: "Correct answer:",
    lessonScore: (right, total) => `${right} of ${total} right first time`,
    locked: "Locked",
    grammarChallenge: "Grammar",
    fillGap: "Choose the word that fits the gap.",
    orderWords: "Put the words in the right order.",
    typeGerman: "Type the sentence in German.",
    listenTypeSentence: "Listen, then type what you hear.",
    typeHere: "Type here",
    almostRight: "Almost right. Look at the marked word again.",
    mindSpecialLetters: "Right! Mind the special letters ä, ö, ü and ß.",
    guidebook: "Guidebook",
    guidebookHint: "The grammar and key phrases of this unit",
    unitGoals: "After this unit you can:",
    lessons: "Lessons",
    checkpoint: "Unit test",
    checkpointIntro: (questions, percent) =>
      `${questions} mixed questions on the whole unit. Get ${percent}% right to pass.`,
    skipAhead: "Know this already? Pass the test to skip ahead.",
    startCheckpoint: "Start the test",
    checkpointPassed: "You passed! This unit is complete.",
    checkpointFailed: "Not quite yet. Practise the lessons and try again.",
    checkpointScore: (right, total) => `${right} of ${total} right`,
    backToUnit: "Back to the unit",
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
    startLesson: "பாடத்தைத் தொடங்கு",
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
    tapLettersToSpell: (word) => `${word} என்று எழுத எழுத்துக்களைத் தட்டவும்.`,
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
    resetLetters: "எழுத்துக்களை மீட்டமை",
    openKeyboard: "விசைப்பலகையில் தட்டச்சு செய்",
    playGermanWord: "ஜெர்மன் சொல்லைக் கேள்",
    tapToHear: (text) => `${text} — கேட்க தட்டவும்`,
    correctMeaning: (word, meaning) => `${word} = ${meaning}!`,
    hintBird: "குறிப்பு: இந்த விலங்கிற்கு இறகுகள் உண்டு, பாட விரும்பும்.",
    hintGeneric: "குறிப்பு: சொல்லை மீண்டும் கேட்டு படத்தைப் பற்றி யோசி.",
    roundSuccess: "அருமை! இந்தப் பாடத்தை முடித்துவிட்டாய்.",
    backToPath: "என் பாதைக்குத் திரும்பு",
    expandSection: "விரிவாக்கு",
    collapseSection: "சுருக்கு",
    comingSoon: "விரைவில் வருகிறது",
    moreLessons: "மேலும் பாடங்கள்",
    tip: "குறிப்பு",
    buildMeaning: "பொருளை உருவாக்க சொற்களைத் தட்டவும்.",
    buildGerman: "ஜெர்மன் வாக்கியத்தை உருவாக்க சொற்களைத் தட்டவும்.",
    listenBuildSentence: "கேளுங்கள், பிறகு நீங்கள் கேட்ட சொற்களைத் தட்டவும்.",
    listenPickMeaning: "கேளுங்கள், பிறகு பொருளைத் தேர்ந்தெடுங்கள்.",
    playSentence: "வாக்கியத்தைக் கேள்",
    playSlowly: "மெதுவாகக் கேள்",
    exitLesson: "பாடத்திலிருந்து வெளியேறு",
    correctAnswer: "சரியான விடை:",
    lessonScore: (right, total) => `${total}-இல் ${right} முதல் முயற்சியிலேயே சரி`,
    locked: "பூட்டப்பட்டுள்ளது",
    grammarChallenge: "இலக்கணம்",
    fillGap: "இடைவெளிக்குப் பொருந்தும் சொல்லைத் தேர்ந்தெடுங்கள்.",
    orderWords: "சொற்களைச் சரியான வரிசையில் அமைக்கவும்.",
    typeGerman: "வாக்கியத்தை ஜெர்மன் மொழியில் தட்டச்சு செய்யுங்கள்.",
    listenTypeSentence: "கேளுங்கள், பிறகு கேட்டதைத் தட்டச்சு செய்யுங்கள்.",
    typeHere: "இங்கே தட்டச்சு செய்யுங்கள்",
    almostRight: "கிட்டத்தட்ட சரி. குறிக்கப்பட்ட சொல்லை மீண்டும் பாருங்கள்.",
    mindSpecialLetters: "சரி! ä, ö, ü, ß ஆகிய சிறப்பு எழுத்துக்களைக் கவனியுங்கள்.",
    guidebook: "வழிகாட்டி",
    guidebookHint: "இந்த அலகின் இலக்கணமும் முக்கிய சொற்றொடர்களும்",
    unitGoals: "இந்த அலகுக்குப் பிறகு உங்களால் முடியும்:",
    lessons: "பாடங்கள்",
    checkpoint: "அலகுத் தேர்வு",
    checkpointIntro: (questions, percent) =>
      `அலகு முழுவதிலிருந்தும் ${questions} கலப்புக் கேள்விகள். தேர்ச்சி பெற ${percent}% சரியாக இருக்க வேண்டும்.`,
    skipAhead: "இது ஏற்கனவே தெரியுமா? தேர்வில் தேர்ச்சி பெற்று முன்னே செல்லுங்கள்.",
    startCheckpoint: "தேர்வைத் தொடங்கு",
    checkpointPassed: "தேர்ச்சி பெற்றுவிட்டீர்கள்! இந்த அலகு முடிந்தது.",
    checkpointFailed: "இன்னும் இல்லை. பாடங்களைப் பயிற்சி செய்து மீண்டும் முயலுங்கள்.",
    checkpointScore: (right, total) => `${total}-இல் ${right} சரி`,
    backToUnit: "அலகுக்குத் திரும்பு",
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
    startLesson: "පාඩම අරඹන්න",
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
    tapLettersToSpell: (word) => `${word} යනුවෙන් ලිවීමට අකුරු ඔබන්න.`,
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
    resetLetters: "අකුරු යළි සකසන්න",
    openKeyboard: "යතුරුපුවරුවෙන් ටයිප් කරන්න",
    playGermanWord: "ජර්මානු වචනය ඇසෙන්න",
    tapToHear: (text) => `${text} — ඇසීමට ඔබන්න`,
    correctMeaning: (word, meaning) => `${word} = ${meaning}!`,
    hintBird: "ඉඟිය: මෙම සතාට පිහාටු ඇති අතර ගායනා කිරීමට කැමතියි.",
    hintGeneric: "ඉඟිය: වචනය නැවත අසා පින්තූරය ගැන සිතන්න.",
    roundSuccess: "නියමයි! ඔබ මෙම පාඩම අවසන් කළා.",
    backToPath: "මගේ මාවතට ආපසු",
    expandSection: "විස්තීරණය කරන්න",
    collapseSection: "හකුළන්න",
    comingSoon: "ළඟදීම පැමිණේ",
    moreLessons: "තවත් පාඩම්",
    tip: "ඉඟිය",
    buildMeaning: "අර්ථය සෑදීමට වචන ඔබන්න.",
    buildGerman: "ජර්මානු වාක්‍යය සෑදීමට වචන ඔබන්න.",
    listenBuildSentence: "අහන්න, පසුව ඔබ ඇසූ වචන ඔබන්න.",
    listenPickMeaning: "අහන්න, පසුව අර්ථය තෝරන්න.",
    playSentence: "වාක්‍යය අහන්න",
    playSlowly: "හෙමින් අහන්න",
    exitLesson: "පාඩමෙන් ඉවත් වන්න",
    correctAnswer: "නිවැරදි පිළිතුර:",
    lessonScore: (right, total) => `${total}න් ${right}ක් පළමු වරම නිවැරදියි`,
    locked: "අගුලු දමා ඇත",
    grammarChallenge: "ව්‍යාකරණ",
    fillGap: "හිස්තැනට ගැලපෙන වචනය තෝරන්න.",
    orderWords: "වචන නිවැරදි පිළිවෙළට සකසන්න.",
    typeGerman: "වාක්‍යය ජර්මානු භාෂාවෙන් ටයිප් කරන්න.",
    listenTypeSentence: "අහන්න, පසුව ඔබ ඇසූ දේ ටයිප් කරන්න.",
    typeHere: "මෙතන ටයිප් කරන්න",
    almostRight: "බොහෝ දුරට නිවැරදියි. සලකුණු කළ වචනය නැවත බලන්න.",
    mindSpecialLetters: "නිවැරදියි! ä, ö, ü සහ ß විශේෂ අකුරු ගැන සැලකිලිමත් වන්න.",
    guidebook: "මාර්ගෝපදේශය",
    guidebookHint: "මෙම ඒකකයේ ව්‍යාකරණ සහ ප්‍රධාන වාක්‍ය ඛණ්ඩ",
    unitGoals: "මෙම ඒකකයෙන් පසු ඔබට පුළුවන්:",
    lessons: "පාඩම්",
    checkpoint: "ඒකක පරීක්ෂණය",
    checkpointIntro: (questions, percent) =>
      `මුළු ඒකකයෙන්ම මිශ්‍ර ප්‍රශ්න ${questions}ක්. සමත් වීමට ${percent}%ක් නිවැරදි විය යුතුයි.`,
    skipAhead: "මෙය දැනටමත් දන්නවාද? පරීක්ෂණය සමත් වී ඉදිරියට යන්න.",
    startCheckpoint: "පරීක්ෂණය අරඹන්න",
    checkpointPassed: "ඔබ සමත්! මෙම ඒකකය සම්පූර්ණයි.",
    checkpointFailed: "තවම නැහැ. පාඩම් පුහුණු වී නැවත උත්සාහ කරන්න.",
    checkpointScore: (right, total) => `${total}න් ${right}ක් නිවැරදියි`,
    backToUnit: "ඒකකයට ආපසු",
  },
};
