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
const regularBonusSpan = document.getElementById('regularBonus');
const timeNeededSpan = document.getElementById('timeNeeded');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const unitManBtn = document.getElementById('unitMan');
const unitRegularBtn = document.getElementById('unitRegular');

// Advanced options elements
const advancedToggle = document.getElementById('advancedToggle');
const advancedContent = document.getElementById('advancedContent');
const expCouponCheckbox = document.getElementById('expCoupon');
const couponOptions = document.getElementById('couponOptions');
const weatherEventCheckbox = document.getElementById('weatherEvent');
const weatherOptions = document.getElementById('weatherOptions');

// Track current unit mode ('man' or 'regular')
let currentUnit = 'man'; // Default to 萬 (10,000)

// Toggle advanced options
function toggleAdvancedOptions() {
    advancedContent.classList.toggle('hidden');
    advancedToggle.classList.toggle('active');
}

// Toggle event options
function toggleEventOptions(checkbox, optionsDiv) {
    if (checkbox.checked) {
        optionsDiv.classList.remove('hidden');
    } else {
        optionsDiv.classList.add('hidden');
    }
}

// Calculate regular EXP multiplier (always-on bonuses)
function calculateRegularMultiplier() {
    let multiplier = 0; // Base is 100%, we track additional %

    // Holy Symbol (無/活7/死7)
    const holySymbol = document.querySelector('input[name="holySymbol"]:checked');
    if (holySymbol) {
        if (holySymbol.value === 'alive') {
            multiplier += 50; // 活7 +50%
        } else if (holySymbol.value === 'dead') {
            multiplier += 25; // 死7 +25%
        }
        // 'none' adds 0%
    }

    // Taunt buff
    if (document.getElementById('tauntBuff').checked) {
        multiplier += 30; // 挑釁 +30%
    }

    return multiplier;
}

// Calculate event EXP multiplier
function calculateEventMultiplier() {
    let multiplier = 0;

    // EXP Coupon
    if (document.getElementById('expCoupon').checked) {
        const couponType = document.querySelector('input[name="couponType"]:checked').value;
        if (couponType === '2x') {
            multiplier += 100; // +100%
        } else if (couponType === '3x') {
            multiplier += 200; // +200%
        }
    }

    // Weather Event
    if (document.getElementById('weatherEvent').checked) {
        const weatherType = document.querySelector('input[name="weatherType"]:checked').value;
        if (weatherType === '2x') {
            multiplier += 100; // +100%
        } else if (weatherType === '3x') {
            multiplier += 200; // +200%
        }
    }

    return multiplier;
}

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

// Get coupon label
function getCouponLabel(multiplier) {
    if (multiplier === 100) return '2x加倍券';
    if (multiplier === 200) return '3x加倍券';
    return '加倍券';
}

// Get weather label
function getWeatherLabel(multiplier) {
    if (multiplier === 100) return '2x氣場';
    if (multiplier === 200) return '3x氣場';
    return '氣場';
}

// Add breakdown item to event breakdown display
function addBreakdownItem(container, label, multiplier, timeMinutes) {
    const div = document.createElement('div');
    div.className = 'result-item';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'result-label';
    labelSpan.textContent = `└ ${label}${multiplier > 0 ? ` (+${multiplier}%)` : ''}:`;

    const valueSpan = document.createElement('span');
    valueSpan.className = 'result-value-secondary';
    valueSpan.textContent = formatTime(timeMinutes);

    div.appendChild(labelSpan);
    div.appendChild(valueSpan);
    container.appendChild(div);
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
    // Note: This input already includes regular buffs (Holy Symbol, Taunt, etc.)
    const baseExpEfficiency = currentUnit === 'man' ? expEfficiency * 10000 : expEfficiency;

    // Calculate regular multiplier
    const regularMultiplier = calculateRegularMultiplier(); // For display only

    // The input already includes regular buffs, so we use it directly
    const regularExpPerTenMin = baseExpEfficiency;

    // Get event details
    const hasCoupon = document.getElementById('expCoupon').checked;
    const hasWeather = document.getElementById('weatherEvent').checked;

    let couponMinutes = 0;
    let weatherMinutes = 0;
    let couponMultiplier = 0;
    let weatherMultiplier = 0;

    if (hasCoupon) {
        const couponCount = parseInt(document.getElementById('couponCount').value);
        // Each coupon = 30 minutes, -1 = infinite
        couponMinutes = couponCount === -1 ? Infinity : couponCount * 30;
        const couponType = document.querySelector('input[name="couponType"]:checked').value;
        couponMultiplier = couponType === '2x' ? 100 : 200;
    }

    if (hasWeather) {
        const weatherTimes = parseInt(document.getElementById('weatherTimes').value);
        weatherMinutes = weatherTimes * 30;
        const weatherType = document.querySelector('input[name="weatherType"]:checked').value;
        weatherMultiplier = weatherType === '2x' ? 100 : 200;
    }

    // Calculate EXP rates for different phases
    // Formula: measuredRate * (100 + R + E) / (100 + R)
    const bothActiveRate = baseExpEfficiency * (100 + regularMultiplier + couponMultiplier + weatherMultiplier) / (100 + regularMultiplier);
    const couponOnlyRate = baseExpEfficiency * (100 + regularMultiplier + couponMultiplier) / (100 + regularMultiplier);
    const weatherOnlyRate = baseExpEfficiency * (100 + regularMultiplier + weatherMultiplier) / (100 + regularMultiplier);

    // Calculate time distribution across phases
    let remainingExp = totalExpNeeded;
    let timeBreakdown = {
        bothActive: 0,
        couponOnly: 0,
        weatherOnly: 0,
        noEvents: 0
    };

    // Phase 1: Both coupon and weather active
    if (hasCoupon && hasWeather && remainingExp > 0) {
        const bothActiveDuration = Math.min(couponMinutes, weatherMinutes);
        const expPerMinute = bothActiveRate / 10;
        const expInPhase = expPerMinute * bothActiveDuration;

        if (expInPhase >= remainingExp) {
            timeBreakdown.bothActive = remainingExp / expPerMinute;
            remainingExp = 0;
        } else {
            timeBreakdown.bothActive = bothActiveDuration;
            remainingExp -= expInPhase;
        }
    }

    // Phase 2: Coupon only (if coupon lasts longer than weather)
    if (hasCoupon && remainingExp > 0) {
        const couponOnlyDuration = hasWeather ? Math.max(0, couponMinutes - weatherMinutes) : couponMinutes;
        const expPerMinute = couponOnlyRate / 10;
        const expInPhase = expPerMinute * couponOnlyDuration;

        if (expInPhase >= remainingExp) {
            timeBreakdown.couponOnly = remainingExp / expPerMinute;
            remainingExp = 0;
        } else {
            timeBreakdown.couponOnly = couponOnlyDuration;
            remainingExp -= expInPhase;
        }
    }

    // Phase 3: Weather only (if weather lasts longer than coupon)
    if (hasWeather && remainingExp > 0) {
        const weatherOnlyDuration = hasCoupon ? Math.max(0, weatherMinutes - couponMinutes) : weatherMinutes;
        const expPerMinute = weatherOnlyRate / 10;
        const expInPhase = expPerMinute * weatherOnlyDuration;

        if (expInPhase >= remainingExp) {
            timeBreakdown.weatherOnly = remainingExp / expPerMinute;
            remainingExp = 0;
        } else {
            timeBreakdown.weatherOnly = weatherOnlyDuration;
            remainingExp -= expInPhase;
        }
    }

    // Phase 4: No events (regular grinding)
    if (remainingExp > 0) {
        const expPerMinute = regularExpPerTenMin / 10;
        timeBreakdown.noEvents = remainingExp / expPerMinute;
    }

    // Calculate total time
    const totalTimeMinutes = timeBreakdown.bothActive + timeBreakdown.couponOnly + timeBreakdown.weatherOnly + timeBreakdown.noEvents;
    const hasEvents = hasCoupon || hasWeather;

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
    document.getElementById('regularBonus').textContent = `+${regularMultiplier}%`;
    timeNeededSpan.textContent = formatTime(totalTimeMinutes);

    // Show/hide event breakdown with detailed phases
    const eventBreakdown = document.getElementById('eventTimeBreakdown');
    if (hasEvents) {
        // Clear previous breakdown
        eventBreakdown.innerHTML = '';

        // Phase 1: Both active
        if (timeBreakdown.bothActive > 0) {
            const bothMultiplier = couponMultiplier + weatherMultiplier;
            const label = getCouponLabel(couponMultiplier) + '+' + getWeatherLabel(weatherMultiplier);
            addBreakdownItem(eventBreakdown, label, bothMultiplier, timeBreakdown.bothActive);
        }

        // Phase 2: Coupon only
        if (timeBreakdown.couponOnly > 0) {
            const label = getCouponLabel(couponMultiplier);
            addBreakdownItem(eventBreakdown, label, couponMultiplier, timeBreakdown.couponOnly);
        }

        // Phase 3: Weather only
        if (timeBreakdown.weatherOnly > 0) {
            const label = getWeatherLabel(weatherMultiplier);
            addBreakdownItem(eventBreakdown, label, weatherMultiplier, timeBreakdown.weatherOnly);
        }

        // Phase 4: No events
        if (timeBreakdown.noEvents > 0) {
            addBreakdownItem(eventBreakdown, '活動結束後', 0, timeBreakdown.noEvents);
        }

        eventBreakdown.classList.remove('hidden');
    } else {
        eventBreakdown.classList.add('hidden');
    }

    resultsDiv.classList.remove('hidden');

    // Save to localStorage
    saveToLocalStorage();
}

// Toggle unit mode
function toggleUnit(unit) {
    currentUnit = unit;

    if (unit === 'man') {
        unitManBtn.classList.add('active');
        unitRegularBtn.classList.remove('active');
        expEfficiencyInput.placeholder = '輸入每10分鐘獲得的經驗值 (萬)';
    } else {
        unitManBtn.classList.remove('active');
        unitRegularBtn.classList.add('active');
        expEfficiencyInput.placeholder = '輸入每10分鐘獲得的經驗值';
    }

    // Save unit preference
    localStorage.setItem('expUnit', unit);
}

// Save form values to localStorage
function saveToLocalStorage() {
    // Get Holy Symbol value
    const holySymbol = document.querySelector('input[name="holySymbol"]:checked');

    // Get coupon type value
    const couponType = document.querySelector('input[name="couponType"]:checked');

    // Get weather type value
    const weatherType = document.querySelector('input[name="weatherType"]:checked');

    const formData = {
        currentLevel: currentLevelInput.value,
        currentExp: currentExpInput.value,
        targetLevel: targetLevelInput.value,
        expEfficiency: expEfficiencyInput.value,
        unit: currentUnit,
        // Advanced options - regular buffs
        holySymbol: holySymbol ? holySymbol.value : 'none',
        tauntBuff: document.getElementById('tauntBuff').checked,
        // Advanced options - events
        expCoupon: document.getElementById('expCoupon').checked,
        couponType: couponType ? couponType.value : '2x',
        couponCount: document.getElementById('couponCount').value,
        weatherEvent: document.getElementById('weatherEvent').checked,
        weatherType: weatherType ? weatherType.value : '2x',
        weatherTimes: document.getElementById('weatherTimes').value
    };

    localStorage.setItem('artaleCalcData', JSON.stringify(formData));
}

// Load form values from localStorage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('artaleCalcData');

    if (savedData) {
        try {
            const formData = JSON.parse(savedData);

            // Basic inputs
            if (formData.currentLevel) currentLevelInput.value = formData.currentLevel;
            if (formData.currentExp) currentExpInput.value = formData.currentExp;
            if (formData.targetLevel) targetLevelInput.value = formData.targetLevel;
            if (formData.expEfficiency) expEfficiencyInput.value = formData.expEfficiency;
            if (formData.unit) toggleUnit(formData.unit);

            // Advanced options - regular buffs
            if (formData.holySymbol !== undefined) {
                const holySymbolRadio = document.querySelector(`input[name="holySymbol"][value="${formData.holySymbol}"]`);
                if (holySymbolRadio) holySymbolRadio.checked = true;
            }

            if (formData.tauntBuff !== undefined) {
                document.getElementById('tauntBuff').checked = formData.tauntBuff;
            }

            // Advanced options - events
            if (formData.expCoupon !== undefined) {
                const expCouponCheckbox = document.getElementById('expCoupon');
                expCouponCheckbox.checked = formData.expCoupon;
                toggleEventOptions(expCouponCheckbox, couponOptions);
            }

            if (formData.couponType !== undefined) {
                const couponTypeRadio = document.querySelector(`input[name="couponType"][value="${formData.couponType}"]`);
                if (couponTypeRadio) couponTypeRadio.checked = true;
            }

            if (formData.couponCount !== undefined) {
                document.getElementById('couponCount').value = formData.couponCount;
            }

            if (formData.weatherEvent !== undefined) {
                const weatherEventCheckbox = document.getElementById('weatherEvent');
                weatherEventCheckbox.checked = formData.weatherEvent;
                toggleEventOptions(weatherEventCheckbox, weatherOptions);
            }

            if (formData.weatherType !== undefined) {
                const weatherTypeRadio = document.querySelector(`input[name="weatherType"][value="${formData.weatherType}"]`);
                if (weatherTypeRadio) weatherTypeRadio.checked = true;
            }

            if (formData.weatherTimes !== undefined) {
                document.getElementById('weatherTimes').value = formData.weatherTimes;
            }
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
unitManBtn.addEventListener('click', () => toggleUnit('man'));
unitRegularBtn.addEventListener('click', () => toggleUnit('regular'));

// Advanced options event listeners
advancedToggle.addEventListener('click', toggleAdvancedOptions);

expCouponCheckbox.addEventListener('change', () => {
    toggleEventOptions(expCouponCheckbox, couponOptions);
});

weatherEventCheckbox.addEventListener('change', () => {
    toggleEventOptions(weatherEventCheckbox, weatherOptions);
});

// Clear custom validation messages when user types
currentLevelInput.addEventListener('input', () => currentLevelInput.setCustomValidity(''));
currentExpInput.addEventListener('input', () => currentExpInput.setCustomValidity(''));
targetLevelInput.addEventListener('input', () => targetLevelInput.setCustomValidity(''));
expEfficiencyInput.addEventListener('input', () => expEfficiencyInput.setCustomValidity(''));

// Save to localStorage when advanced options change
// Holy Symbol radio buttons
document.querySelectorAll('input[name="holySymbol"]').forEach(radio => {
    radio.addEventListener('change', saveToLocalStorage);
});

// Taunt checkbox
document.getElementById('tauntBuff').addEventListener('change', saveToLocalStorage);

// Coupon related
expCouponCheckbox.addEventListener('change', saveToLocalStorage);
document.querySelectorAll('input[name="couponType"]').forEach(radio => {
    radio.addEventListener('change', saveToLocalStorage);
});
document.getElementById('couponCount').addEventListener('input', saveToLocalStorage);

// Weather related
weatherEventCheckbox.addEventListener('change', saveToLocalStorage);
document.querySelectorAll('input[name="weatherType"]').forEach(radio => {
    radio.addEventListener('change', saveToLocalStorage);
});
document.getElementById('weatherTimes').addEventListener('input', saveToLocalStorage);

// Save to localStorage when basic inputs change
currentLevelInput.addEventListener('input', saveToLocalStorage);
currentExpInput.addEventListener('input', saveToLocalStorage);
targetLevelInput.addEventListener('input', saveToLocalStorage);
expEfficiencyInput.addEventListener('input', saveToLocalStorage);

// Initialize
function init() {
    loadFromLocalStorage();
    loadTheme();

    // Set default placeholder based on current unit
    if (currentUnit === 'man') {
        expEfficiencyInput.placeholder = '輸入每10分鐘獲得的經驗值 (萬)';
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
