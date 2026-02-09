// Exp data embedded directly to avoid CORS issues when opening locally
const expData = [
    { "level": 1, "exp": 0 },
    { "level": 2, "exp": 15 },
    { "level": 3, "exp": 34 },
    { "level": 4, "exp": 57 },
    { "level": 5, "exp": 92 },
    { "level": 6, "exp": 135 },
    { "level": 7, "exp": 372 },
    { "level": 8, "exp": 560 },
    { "level": 9, "exp": 840 },
    { "level": 10, "exp": 1242 },
    { "level": 11, "exp": 1716 },
    { "level": 12, "exp": 2360 },
    { "level": 13, "exp": 3216 },
    { "level": 14, "exp": 4200 },
    { "level": 15, "exp": 5460 },
    { "level": 16, "exp": 7050 },
    { "level": 17, "exp": 8840 },
    { "level": 18, "exp": 11040 },
    { "level": 19, "exp": 13716 },
    { "level": 20, "exp": 16680 },
    { "level": 21, "exp": 20216 },
    { "level": 22, "exp": 24402 },
    { "level": 23, "exp": 28980 },
    { "level": 24, "exp": 34320 },
    { "level": 25, "exp": 40512 },
    { "level": 26, "exp": 47216 },
    { "level": 27, "exp": 54900 },
    { "level": 28, "exp": 63666 },
    { "level": 29, "exp": 73080 },
    { "level": 30, "exp": 83720 },
    { "level": 31, "exp": 95700 },
    { "level": 32, "exp": 108480 },
    { "level": 33, "exp": 122760 },
    { "level": 34, "exp": 138666 },
    { "level": 35, "exp": 155540 },
    { "level": 36, "exp": 174216 },
    { "level": 37, "exp": 194832 },
    { "level": 38, "exp": 216600 },
    { "level": 39, "exp": 240500 },
    { "level": 40, "exp": 266682 },
    { "level": 41, "exp": 294216 },
    { "level": 42, "exp": 324240 },
    { "level": 43, "exp": 356916 },
    { "level": 44, "exp": 391160 },
    { "level": 45, "exp": 428280 },
    { "level": 46, "exp": 468450 },
    { "level": 47, "exp": 510420 },
    { "level": 48, "exp": 555680 },
    { "level": 49, "exp": 604416 },
    { "level": 50, "exp": 655200 },
    { "level": 51, "exp": 709716 },
    { "level": 52, "exp": 748608 },
    { "level": 53, "exp": 789631 },
    { "level": 54, "exp": 832902 },
    { "level": 55, "exp": 878545 },
    { "level": 56, "exp": 926689 },
    { "level": 57, "exp": 977471 },
    { "level": 58, "exp": 1031036 },
    { "level": 59, "exp": 1087536 },
    { "level": 60, "exp": 1147132 },
    { "level": 61, "exp": 1209994 },
    { "level": 62, "exp": 1276301 },
    { "level": 63, "exp": 1346242 },
    { "level": 64, "exp": 1420016 },
    { "level": 65, "exp": 1497832 },
    { "level": 66, "exp": 1579913 },
    { "level": 67, "exp": 1666492 },
    { "level": 68, "exp": 1757815 },
    { "level": 69, "exp": 1854143 },
    { "level": 70, "exp": 1955750 },
    { "level": 71, "exp": 2062925 },
    { "level": 72, "exp": 2175973 },
    { "level": 73, "exp": 2295216 },
    { "level": 74, "exp": 2410993 },
    { "level": 75, "exp": 2553663 },
    { "level": 76, "exp": 2693603 },
    { "level": 77, "exp": 2841212 },
    { "level": 78, "exp": 2996910 },
    { "level": 79, "exp": 3161140 },
    { "level": 80, "exp": 3334370 },
    { "level": 81, "exp": 3517093 },
    { "level": 82, "exp": 3709829 },
    { "level": 83, "exp": 3913127 },
    { "level": 84, "exp": 4127566 },
    { "level": 85, "exp": 4353756 },
    { "level": 86, "exp": 4592341 },
    { "level": 87, "exp": 4844001 },
    { "level": 88, "exp": 5109452 },
    { "level": 89, "exp": 5389449 },
    { "level": 90, "exp": 5684790 },
    { "level": 91, "exp": 5996316 },
    { "level": 92, "exp": 6324914 },
    { "level": 93, "exp": 6671519 },
    { "level": 94, "exp": 7037118 },
    { "level": 95, "exp": 7422752 },
    { "level": 96, "exp": 7829518 },
    { "level": 97, "exp": 8258575 },
    { "level": 98, "exp": 8711144 },
    { "level": 99, "exp": 9188514 },
    { "level": 100, "exp": 9692044 },
    { "level": 101, "exp": 10223168 },
    { "level": 102, "exp": 10783397 },
    { "level": 103, "exp": 11374327 },
    { "level": 104, "exp": 11997640 },
    { "level": 105, "exp": 12655110 },
    { "level": 106, "exp": 13348610 },
    { "level": 107, "exp": 14080113 },
    { "level": 108, "exp": 14851703 },
    { "level": 109, "exp": 15665576 },
    { "level": 110, "exp": 16524049 },
    { "level": 111, "exp": 17429566 },
    { "level": 112, "exp": 18384706 },
    { "level": 113, "exp": 19392187 },
    { "level": 114, "exp": 20454878 },
    { "level": 115, "exp": 21575805 },
    { "level": 116, "exp": 22758159 },
    { "level": 117, "exp": 24005306 },
    { "level": 118, "exp": 25320796 },
    { "level": 119, "exp": 26708375 },
    { "level": 120, "exp": 28171993 },
    { "level": 121, "exp": 29715818 },
    { "level": 122, "exp": 31344244 },
    { "level": 123, "exp": 33061908 },
    { "level": 124, "exp": 34873700 },
    { "level": 125, "exp": 36784778 },
    { "level": 126, "exp": 38800583 },
    { "level": 127, "exp": 40926854 },
    { "level": 128, "exp": 43169645 },
    { "level": 129, "exp": 45535341 },
    { "level": 130, "exp": 48030677 },
    { "level": 131, "exp": 50662758 },
    { "level": 132, "exp": 53439077 },
    { "level": 133, "exp": 56367538 },
    { "level": 134, "exp": 59456479 },
    { "level": 135, "exp": 62714694 },
    { "level": 136, "exp": 66151459 },
    { "level": 137, "exp": 69776558 },
    { "level": 138, "exp": 73600313 },
    { "level": 139, "exp": 77633610 },
    { "level": 140, "exp": 81887931 },
    { "level": 141, "exp": 86375389 },
    { "level": 142, "exp": 91108760 },
    { "level": 143, "exp": 96101520 },
    { "level": 144, "exp": 101367883 },
    { "level": 145, "exp": 106922842 },
    { "level": 146, "exp": 112782213 },
    { "level": 147, "exp": 118962678 },
    { "level": 148, "exp": 125481832 },
    { "level": 149, "exp": 132358236 },
    { "level": 150, "exp": 139611467 },
    { "level": 151, "exp": 147262175 },
    { "level": 152, "exp": 155332142 },
    { "level": 153, "exp": 163844343 },
    { "level": 154, "exp": 172823012 },
    { "level": 155, "exp": 182293713 },
    { "level": 156, "exp": 192283408 },
    { "level": 157, "exp": 202820538 },
    { "level": 158, "exp": 213935103 },
    { "level": 159, "exp": 225658746 },
    { "level": 160, "exp": 238024845 },
    { "level": 161, "exp": 251068606 },
    { "level": 162, "exp": 264827165 },
    { "level": 163, "exp": 279339693 },
    { "level": 164, "exp": 294647508 },
    { "level": 165, "exp": 310794191 },
    { "level": 166, "exp": 327825712 },
    { "level": 167, "exp": 345790561 },
    { "level": 168, "exp": 364739883 },
    { "level": 169, "exp": 384727628 },
    { "level": 170, "exp": 405810702 },
    { "level": 171, "exp": 428049128 },
    { "level": 172, "exp": 451506220 },
    { "level": 173, "exp": 476248760 },
    { "level": 174, "exp": 502347192 },
    { "level": 175, "exp": 529875818 },
    { "level": 176, "exp": 558913012 },
    { "level": 177, "exp": 589541445 },
    { "level": 178, "exp": 621848316 },
    { "level": 179, "exp": 655925603 },
    { "level": 180, "exp": 691870326 },
    { "level": 181, "exp": 729784819 },
    { "level": 182, "exp": 769777027 },
    { "level": 183, "exp": 811960808 },
    { "level": 184, "exp": 856456260 },
    { "level": 185, "exp": 903390063 },
    { "level": 186, "exp": 952895838 },
    { "level": 187, "exp": 1005114529 },
    { "level": 188, "exp": 1060194805 },
    { "level": 189, "exp": 1118293480 },
    { "level": 190, "exp": 1179575962 },
    { "level": 191, "exp": 1244216724 },
    { "level": 192, "exp": 1312399800 },
    { "level": 193, "exp": 1384319309 },
    { "level": 194, "exp": 1460180007 },
    { "level": 195, "exp": 1540197871 },
    { "level": 196, "exp": 1624600714 },
    { "level": 197, "exp": 1713628833 },
    { "level": 198, "exp": 1807535693 },
    { "level": 199, "exp": 1906588648 },
    { "level": 200, "exp": 2011069705 }
];

// DOM elements
const form = document.getElementById('calcForm');
const currentLevelInput = document.getElementById('currentLevel');
const currentExpInput = document.getElementById('currentExp');
const targetLevelInput = document.getElementById('targetLevel');
const expEfficiencyInput = document.getElementById('expEfficiency');
const resultsDiv = document.getElementById('results');
const startLevelSpan = document.getElementById('startLevel');
const endLevelSpan = document.getElementById('endLevel');
const totalExpSpan = document.getElementById('totalExp');
const timeNeededSpan = document.getElementById('timeNeeded');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const unitWanBtn = document.getElementById('unitWan');
const unitRegularBtn = document.getElementById('unitRegular');

// Track current unit mode ('wan' or 'regular')
let currentUnit = 'wan'; // Default to 萬 (10,000)

// Calculate total exp needed
function calculateExpNeeded(currentLevel, currentExp, targetLevel) {
    if (currentLevel >= targetLevel) {
        return 0;
    }

    let totalExpNeeded = 0;

    // First, calculate exp needed to complete current level (reach next level)
    // The exp needed to reach (currentLevel + 1) is stored at index currentLevel
    const expToNextLevel = expData[currentLevel].exp;
    totalExpNeeded += Math.max(0, expToNextLevel - currentExp);

    // Then, add exp needed for all levels from (currentLevel + 1) to targetLevel
    for (let level = currentLevel + 1; level < targetLevel; level++) {
        totalExpNeeded += expData[level].exp;
    }

    return totalExpNeeded;
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Format time (minutes to hours and minutes)
function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);

    if (hours > 0) {
        return `${hours} 小時 ${mins} 分鐘`;
    } else {
        return `${mins} 分鐘`;
    }
}

// Calculate and display results
function calculateResults(e) {
    e.preventDefault();

    // Clear any previous custom validation messages
    currentLevelInput.setCustomValidity('');
    currentExpInput.setCustomValidity('');
    targetLevelInput.setCustomValidity('');
    expEfficiencyInput.setCustomValidity('');

    const currentLevel = parseInt(currentLevelInput.value);
    const currentExp = parseInt(currentExpInput.value);
    const targetLevel = parseInt(targetLevelInput.value);
    const expEfficiency = parseInt(expEfficiencyInput.value);

    // Validation
    if (currentLevel < 1 || currentLevel > 200) {
        currentLevelInput.setCustomValidity('現在等級必須在 1 到 200 之間');
        currentLevelInput.reportValidity();
        return;
    }

    if (targetLevel < 1 || targetLevel > 200) {
        targetLevelInput.setCustomValidity('目標等級必須在 1 到 200 之間');
        targetLevelInput.reportValidity();
        return;
    }

    if (currentLevel >= targetLevel) {
        targetLevelInput.setCustomValidity('目標等級必須大於現在等級');
        targetLevelInput.reportValidity();
        return;
    }

    if (currentExp < 0) {
        currentExpInput.setCustomValidity('現在EXP不能小於 0');
        currentExpInput.reportValidity();
        return;
    }

    // Validate current exp is less than exp needed to level up
    if (currentLevel < 200) {
        const expNeededForNextLevel = expData[currentLevel].exp;
        if (currentExp >= expNeededForNextLevel) {
            currentExpInput.setCustomValidity(`現在EXP必須小於 ${formatNumber(expNeededForNextLevel)} (等級 ${currentLevel + 1} 所需經驗值)`);
            currentExpInput.reportValidity();
            return;
        }
    }

    if (expEfficiency <= 0) {
        expEfficiencyInput.setCustomValidity('經驗效率必須大於 0');
        expEfficiencyInput.reportValidity();
        return;
    }

    // Calculate total exp needed
    const totalExpNeeded = calculateExpNeeded(currentLevel, currentExp, targetLevel);

    // Convert exp efficiency based on current unit
    // If unit is 萬, multiply by 10,000
    const actualExpEfficiency = currentUnit === 'wan' ? expEfficiency * 10000 : expEfficiency;

    // Calculate time needed in minutes
    // expEfficiency is per 10 minutes
    const timeNeededMinutes = (totalExpNeeded / actualExpEfficiency) * 10;

    // Calculate percentage of current level progress
    let expPercentage = 0;
    if (currentLevel < 200) {
        const expNeededForNextLevel = expData[currentLevel].exp;
        expPercentage = (currentExp / expNeededForNextLevel) * 100;
    }

    // Display results
    startLevelSpan.textContent = `${currentLevel} (${formatNumber(currentExp)} [${expPercentage.toFixed(2)}%])`;
    endLevelSpan.textContent = `${targetLevel}`;
    totalExpSpan.textContent = formatNumber(totalExpNeeded);
    timeNeededSpan.textContent = formatTime(timeNeededMinutes);
    resultsDiv.classList.remove('hidden');

    // Save to localStorage
    saveToLocalStorage();
}

// Toggle unit mode
function toggleUnit(unit) {
    currentUnit = unit;

    if (unit === 'wan') {
        unitWanBtn.classList.add('active');
        unitRegularBtn.classList.remove('active');
        expEfficiencyInput.placeholder = '輸入每10分鐘獲得的經驗值 (萬)';
    } else {
        unitWanBtn.classList.remove('active');
        unitRegularBtn.classList.add('active');
        expEfficiencyInput.placeholder = '輸入每10分鐘獲得的經驗值';
    }

    // Save unit preference
    localStorage.setItem('expUnit', unit);
}

// Save form values to localStorage
function saveToLocalStorage() {
    const formData = {
        currentLevel: currentLevelInput.value,
        currentExp: currentExpInput.value,
        targetLevel: targetLevelInput.value,
        expEfficiency: expEfficiencyInput.value,
        unit: currentUnit
    };

    localStorage.setItem('artaleCalcData', JSON.stringify(formData));
}

// Load form values from localStorage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('artaleCalcData');

    if (savedData) {
        try {
            const formData = JSON.parse(savedData);

            if (formData.currentLevel) currentLevelInput.value = formData.currentLevel;
            if (formData.currentExp) currentExpInput.value = formData.currentExp;
            if (formData.targetLevel) targetLevelInput.value = formData.targetLevel;
            if (formData.expEfficiency) expEfficiencyInput.value = formData.expEfficiency;
            if (formData.unit) toggleUnit(formData.unit);
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

// Theme toggle functionality
function toggleTheme() {
    document.body.classList.toggle('light-theme');

    const isLightTheme = document.body.classList.contains('light-theme');
    themeIcon.textContent = isLightTheme ? '🌙' : '☀️';

    // Save theme preference
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
}

// Load theme preference
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.textContent = '🌙';
    } else {
        themeIcon.textContent = '☀️';
    }
}

// Event listeners
form.addEventListener('submit', calculateResults);
themeToggle.addEventListener('click', toggleTheme);
unitWanBtn.addEventListener('click', () => toggleUnit('wan'));
unitRegularBtn.addEventListener('click', () => toggleUnit('regular'));

// Clear custom validation messages when user types
currentLevelInput.addEventListener('input', () => currentLevelInput.setCustomValidity(''));
currentExpInput.addEventListener('input', () => currentExpInput.setCustomValidity(''));
targetLevelInput.addEventListener('input', () => targetLevelInput.setCustomValidity(''));
expEfficiencyInput.addEventListener('input', () => expEfficiencyInput.setCustomValidity(''));

// Initialize
function init() {
    loadFromLocalStorage();
    loadTheme();

    // Set default placeholder based on current unit
    if (currentUnit === 'wan') {
        expEfficiencyInput.placeholder = '輸入每10分鐘獲得的經驗值 (萬)';
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
