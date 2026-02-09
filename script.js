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
const advancedOptions = document.getElementById('advancedOptions');
const advancedContent = document.getElementById('advancedContent');
const expCouponCheckbox = document.getElementById('expCoupon');
const couponOptions = document.getElementById('couponOptions');
const weatherEventCheckbox = document.getElementById('weatherEvent');
const weatherOptions = document.getElementById('weatherOptions');
const dailyGrindingInput = document.getElementById('dailyGrindingInput');
const targetDaysInput = document.getElementById('targetDaysInput');

// Track current mode ('simple' or 'advanced')
let currentMode = 'simple'; // Default to 簡單模式

// Track current unit mode ('man' or 'regular')
let currentUnit = 'man'; // Default to 萬 (10,000)

// Track current time unit for daily grinding ('hour' or 'minute')
let currentTimeUnit = 'hour'; // Default to 小時

// Toggle between simple and advanced modes
function toggleMode(mode) {
    currentMode = mode;

    const modeSimpleBtn = document.getElementById('modeSimple');
    const modeAdvancedBtn = document.getElementById('modeAdvanced');

    if (mode === 'simple') {
        modeSimpleBtn.classList.add('active');
        modeAdvancedBtn.classList.remove('active');
        advancedOptions.classList.add('hidden');
    } else {
        modeSimpleBtn.classList.remove('active');
        modeAdvancedBtn.classList.add('active');
        advancedOptions.classList.remove('hidden');
    }

    // Save mode preference to unified storage
    saveToLocalStorage();
}

// Toggle event options
function toggleEventOptions(checkbox, optionsDiv) {
    if (checkbox.checked) {
        optionsDiv.classList.remove('hidden');
    } else {
        optionsDiv.classList.add('hidden');
    }
}

// Toggle schedule mode inputs
function toggleScheduleMode() {
    const scheduleMode = document.querySelector('input[name="scheduleMode"]:checked');
    if (scheduleMode && scheduleMode.value === 'daily') {
        dailyGrindingInput.classList.remove('hidden');
        targetDaysInput.classList.add('hidden');
    } else if (scheduleMode && scheduleMode.value === 'target') {
        dailyGrindingInput.classList.add('hidden');
        targetDaysInput.classList.remove('hidden');
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
    timeNeededSpan.textContent = formatTime(totalTimeMinutes);

    // Show/hide advanced result details based on mode
    const regularBonusItem = document.getElementById('regularBonus').parentElement;
    if (currentMode === 'simple') {
        regularBonusItem.classList.add('hidden');
    } else {
        regularBonusItem.classList.remove('hidden');
        document.getElementById('regularBonus').textContent = `+${regularMultiplier}%`;
    }

    // Show/hide event breakdown with detailed phases (only in advanced mode)
    const eventBreakdown = document.getElementById('eventTimeBreakdown');
    if (currentMode === 'advanced' && hasEvents) {
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

    // Calculate grinding schedule if applicable (only in advanced mode)
    const scheduleMode = document.querySelector('input[name="scheduleMode"]:checked');
    const scheduleResultDiv = document.getElementById('scheduleResult');
    const scheduleLabel = document.getElementById('scheduleLabel');
    const scheduleValue = document.getElementById('scheduleValue');

    if (currentMode === 'advanced' && scheduleMode && scheduleMode.value === 'daily') {
        const dailyTime = parseFloat(document.getElementById('dailyTime').value) || 0;
        if (dailyTime > 0) {
            // Convert to minutes based on current unit
            const dailyMinutes = currentTimeUnit === 'hour' ? dailyTime * 60 : dailyTime;

            // Calculate days required
            const daysRequired = Math.ceil(totalTimeMinutes / dailyMinutes);
            const timeUnit = currentTimeUnit === 'hour' ? '小時' : '分鐘';
            scheduleLabel.textContent = '所需天數:';
            scheduleValue.textContent = `${daysRequired} 天 (每日 ${dailyTime} ${timeUnit})`;
            scheduleResultDiv.classList.remove('hidden');
        } else {
            scheduleResultDiv.classList.add('hidden');
        }
    } else if (currentMode === 'advanced' && scheduleMode && scheduleMode.value === 'target') {
        const targetDays = parseInt(document.getElementById('targetDays').value) || 0;
        if (targetDays > 0) {
            // Calculate minutes required per day
            const minutesPerDay = Math.ceil(totalTimeMinutes / targetDays);
            scheduleLabel.textContent = '每日所需時間:';
            scheduleValue.textContent = `${minutesPerDay} 分鐘 (共 ${targetDays} 天)`;
            scheduleResultDiv.classList.remove('hidden');
        } else {
            scheduleResultDiv.classList.add('hidden');
        }
    } else {
        scheduleResultDiv.classList.add('hidden');
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

// Toggle time unit mode for daily grinding
function toggleTimeUnit(unit) {
    currentTimeUnit = unit;

    const unitHourBtn = document.getElementById('unitHour');
    const unitMinuteBtn = document.getElementById('unitMinute');

    if (unit === 'hour') {
        unitHourBtn.classList.add('active');
        unitMinuteBtn.classList.remove('active');
    } else {
        unitHourBtn.classList.remove('active');
        unitMinuteBtn.classList.add('active');
    }

    // Save time unit preference
    localStorage.setItem('timeUnit', unit);
}

// Save form values to localStorage
function saveToLocalStorage() {
    // Get Holy Symbol value
    const holySymbol = document.querySelector('input[name="holySymbol"]:checked');

    // Get coupon type value
    const couponType = document.querySelector('input[name="couponType"]:checked');

    // Get weather type value
    const weatherType = document.querySelector('input[name="weatherType"]:checked');

    // Get schedule mode value
    const scheduleMode = document.querySelector('input[name="scheduleMode"]:checked');

    const formData = {
        mode: currentMode,
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
        weatherTimes: document.getElementById('weatherTimes').value,
        // Advanced options - grinding schedule
        scheduleMode: scheduleMode ? scheduleMode.value : 'daily',
        dailyTime: document.getElementById('dailyTime').value,
        timeUnit: currentTimeUnit,
        targetDays: document.getElementById('targetDays').value
    };

    localStorage.setItem('artaleCalcData', JSON.stringify(formData));
}

// Load form values from localStorage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('artaleCalcData');

    if (savedData) {
        try {
            const formData = JSON.parse(savedData);

            // Mode
            if (formData.mode !== undefined) {
                toggleMode(formData.mode);
            }

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

            // Advanced options - grinding schedule
            if (formData.scheduleMode !== undefined) {
                const scheduleModeRadio = document.querySelector(`input[name="scheduleMode"][value="${formData.scheduleMode}"]`);
                if (scheduleModeRadio) {
                    scheduleModeRadio.checked = true;
                    toggleScheduleMode();
                }
            }

            if (formData.timeUnit !== undefined) {
                toggleTimeUnit(formData.timeUnit);
            }

            if (formData.dailyTime !== undefined) {
                document.getElementById('dailyTime').value = formData.dailyTime;
            }

            if (formData.targetDays !== undefined) {
                document.getElementById('targetDays').value = formData.targetDays;
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

// Mode toggle event listeners
document.getElementById('modeSimple').addEventListener('click', () => toggleMode('simple'));
document.getElementById('modeAdvanced').addEventListener('click', () => toggleMode('advanced'));

// Advanced options event listeners
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

// Grinding schedule related
document.querySelectorAll('input[name="scheduleMode"]').forEach(radio => {
    radio.addEventListener('change', () => {
        toggleScheduleMode();
        saveToLocalStorage();
    });
});
document.getElementById('unitHour').addEventListener('click', () => toggleTimeUnit('hour'));
document.getElementById('unitMinute').addEventListener('click', () => toggleTimeUnit('minute'));
document.getElementById('dailyTime').addEventListener('input', saveToLocalStorage);
document.getElementById('targetDays').addEventListener('input', saveToLocalStorage);

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

// ====================
// Level History Tracking
// ====================

let levelHistory = [];
let historyChart = null;

// Load history from localStorage
function loadHistory() {
    const savedHistory = localStorage.getItem('artaleExpHistory');
    if (savedHistory) {
        try {
            levelHistory = JSON.parse(savedHistory);
        } catch (error) {
            console.error('Error loading history:', error);
            levelHistory = [];
        }
    }
}

// Save history to localStorage
function saveHistory() {
    localStorage.setItem('artaleExpHistory', JSON.stringify(levelHistory));
}

// Calculate total EXP from level and current exp
function calculateTotalExp(level, currentExp) {
    // Use pre-calculated accumulated exp data for O(1) lookup
    return accumulatedExpData[level - 1] + currentExp;
}

// Record current level and exp
function recordLevelExp() {
    const currentLevel = parseInt(currentLevelInput.value);
    const currentExp = parseInt(currentExpInput.value);

    // Validate inputs
    if (!currentLevel || !currentExp || currentLevel < 1 || currentLevel > 200 || currentExp < 0) {
        alert('請先輸入有效的等級和經驗值');
        return;
    }

    // Validate current exp is less than exp needed to level up
    if (currentLevel < 200) {
        const expNeededForNextLevel = expData[currentLevel].exp;
        if (currentExp >= expNeededForNextLevel) {
            alert(`現在EXP必須小於 ${formatNumber(expNeededForNextLevel)} (等級 ${currentLevel + 1} 所需經驗值)`);
            return;
        }
    }

    const timestamp = Date.now();
    const totalExp = calculateTotalExp(currentLevel, currentExp);

    levelHistory.push({
        timestamp: timestamp,
        level: currentLevel,
        exp: currentExp,
        totalExp: totalExp
    });

    saveHistory();

    // Show confirmation
    const now = new Date(timestamp);
    const timeStr = now.toLocaleString('zh-TW', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    alert(`已記錄!\n時間: ${timeStr}\n等級: ${currentLevel}\nEXP: ${formatNumber(currentExp)}`);

    // Update record count
    updateRecordCount();
}

// Update record count display
function updateRecordCount() {
    const recordCount = document.getElementById('recordCount');
    if (recordCount) {
        recordCount.textContent = levelHistory.length;
    }
}

// Toggle history panel
function toggleHistoryPanel() {
    const historyPanel = document.getElementById('historyPanel');
    const isHidden = historyPanel.classList.contains('hidden');

    if (isHidden) {
        historyPanel.classList.remove('hidden');
        renderHistoryChart();
    } else {
        historyPanel.classList.add('hidden');
    }
}

// Close history panel
function closeHistoryPanel() {
    const historyPanel = document.getElementById('historyPanel');
    historyPanel.classList.add('hidden');
}

// Clear all history with confirmation
function clearAllHistory() {
    if (levelHistory.length === 0) {
        alert('目前沒有記錄可以清除');
        return;
    }

    const confirmation = prompt('此操作將清除所有記錄！\n請輸入 "delete" 以確認刪除：');

    if (confirmation === 'delete') {
        levelHistory = [];
        saveHistory();
        updateRecordCount();
        renderHistoryChart();
        alert('所有記錄已清除！');
    } else if (confirmation !== null) {
        alert('輸入不正確，取消刪除');
    }
}

// Helper function to get total EXP at a specific level
function getTotalExpAtLevel(level) {
    // Use pre-calculated accumulated exp data for O(1) lookup
    return accumulatedExpData[level - 1] || 0;
}

// Helper function to convert total EXP to level + percentage
function totalExpToLevelPercent(totalExp) {
    // Binary search to find the level (O(log n) instead of O(n))
    let left = 0;
    let right = accumulatedExpData.length - 1;
    let level = 1;

    // Find the highest level where accumulated exp <= totalExp
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (accumulatedExpData[mid] <= totalExp) {
            level = mid + 1;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    // Calculate remaining exp in current level
    const expAtLevelStart = accumulatedExpData[level - 1];
    const remainingExp = totalExp - expAtLevelStart;

    // Calculate percentage
    const expForCurrentLevel = expData[level] ? expData[level].exp : 1;
    const percentage = (remainingExp / expForCurrentLevel) * 100;

    return { level, percentage };
}

// Render history chart
function renderHistoryChart() {
    const canvas = document.getElementById('historyChart');
    const ctx = canvas.getContext('2d');

    // Destroy existing chart if it exists
    if (historyChart) {
        historyChart.destroy();
    }

    // If no data, show message
    if (levelHistory.length === 0) {
        // Get container dimensions
        const container = canvas.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Set canvas size to match container
        canvas.width = containerWidth;
        canvas.height = containerHeight;

        // Clear canvas and show message
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '16px "Microsoft JhengHei", Arial, sans-serif';
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('尚無記錄資料', canvas.width / 2, canvas.height / 2);
        return;
    }

    // Sort by timestamp
    const sortedHistory = [...levelHistory].sort((a, b) => a.timestamp - b.timestamp);

    // Prepare data
    const labels = sortedHistory.map(record => {
        const date = new Date(record.timestamp);
        return date.toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    });

    const data = sortedHistory.map(record => record.totalExp);

    // Find min and max levels from history
    const minLevel = Math.min(...sortedHistory.map(r => r.level));
    const currentLevel = parseInt(currentLevelInput.value) || sortedHistory[sortedHistory.length - 1].level;
    const maxLevel = currentLevel + 1;

    // Calculate min and max total EXP for Y-axis
    const minTotalExp = getTotalExpAtLevel(minLevel);
    const maxTotalExp = getTotalExpAtLevel(maxLevel);

    // Generate Y-axis ticks
    const levelRange = maxLevel - minLevel;
    const yAxisTicks = [];

    // Determine percentage markers based on level range
    let percentageMarkers;
    if (levelRange <= 5) {
        percentageMarkers = [0, 20, 40, 60, 80]; // Show 20/40/60/80% for small ranges
    } else {
        percentageMarkers = [0, 50]; // Show only 50% for large ranges
    }

    // Generate ticks for each level and percentage
    for (let level = minLevel; level <= maxLevel; level++) {
        const levelTotalExp = getTotalExpAtLevel(level);

        percentageMarkers.forEach(pct => {
            if (level === maxLevel && pct > 0) return; // Don't show percentages for max level

            const expForThisLevel = expData[level] ? expData[level].exp : 0;
            const tickValue = levelTotalExp + (expForThisLevel * pct / 100);

            yAxisTicks.push({
                value: tickValue,
                level: level,
                percentage: pct
            });
        });
    }

    // Get theme colors
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
    const buttonColor = getComputedStyle(document.documentElement).getPropertyValue('--button-bg').trim();
    const inputBorder = getComputedStyle(document.documentElement).getPropertyValue('--input-border').trim();

    // Create chart
    historyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '等級進度',
                data: data,
                borderColor: buttonColor,
                backgroundColor: buttonColor + '33',
                borderWidth: 2,
                tension: 0.1,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        font: {
                            family: "'Microsoft JhengHei', Arial, sans-serif",
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const record = sortedHistory[context.dataIndex];
                            const { percentage } = totalExpToLevelPercent(record.totalExp);
                            return [
                                `等級: ${record.level} (${percentage.toFixed(1)}%)`,
                                `當前EXP: ${formatNumber(record.exp)}`,
                                `總EXP: ${formatNumber(record.totalExp)}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColor,
                        font: {
                            family: "'Microsoft JhengHei', Arial, sans-serif",
                            size: 10
                        },
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: {
                        color: inputBorder
                    }
                },
                y: {
                    min: minTotalExp,
                    max: maxTotalExp,
                    ticks: {
                        color: textColor,
                        font: {
                            family: "'Microsoft JhengHei', Arial, sans-serif",
                            size: 10
                        },
                        callback: function (value) {
                            // Find the closest tick definition
                            const tick = yAxisTicks.find(t => Math.abs(t.value - value) < 1);
                            if (tick) {
                                if (tick.percentage === 0) {
                                    return `Lv.${tick.level}`;
                                } else {
                                    return `${tick.percentage}%`;
                                }
                            }
                            return '';
                        },
                        // Use our custom tick values
                        stepSize: undefined,
                        autoSkip: false,
                        includeBounds: true
                    },
                    afterBuildTicks: function (axis) {
                        // Override with our custom ticks
                        axis.ticks = yAxisTicks.map(tick => ({
                            value: tick.value,
                            label: tick.percentage === 0 ? `Lv.${tick.level}` : `${tick.percentage}%`
                        }));
                    },
                    grid: {
                        color: function (context) {
                            // Make level boundaries more prominent
                            const tick = yAxisTicks.find(t => Math.abs(t.value - context.tick.value) < 1);
                            if (tick && tick.percentage === 0) {
                                return textColor + '40'; // More opaque for level boundaries
                            }
                            return inputBorder;
                        },
                        lineWidth: function (context) {
                            const tick = yAxisTicks.find(t => Math.abs(t.value - context.tick.value) < 1);
                            if (tick && tick.percentage === 0) {
                                return 2; // Thicker line for level boundaries
                            }
                            return 1;
                        }
                    }
                }
            }
        }
    });
}

// Event listeners for history feature
document.getElementById('recordBtn').addEventListener('click', recordLevelExp);
document.getElementById('historyToggle').addEventListener('click', toggleHistoryPanel);
document.getElementById('closeHistory').addEventListener('click', closeHistoryPanel);
document.getElementById('clearHistory').addEventListener('click', clearAllHistory);

// Load history on init
loadHistory();
updateRecordCount();
