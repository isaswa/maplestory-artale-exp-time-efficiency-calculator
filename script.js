// DOM elements - declare but don't initialize yet
let form, currentLevelInput, currentExpInput, targetLevelInput, expEfficiencyInput;
let resultsDiv, startLevelSpan, endLevelSpan, totalExpSpan, regularBonusSpan, timeNeededSpan;
let themeToggle, themeIcon, unitManBtn, unitRegularBtn;
let advancedOptions, advancedContent;
let expCouponCheckbox, couponOptions, weatherEventCheckbox, weatherOptions;
let customEventCheckbox, customOptions;
let dailyGrindingInput, targetDaysInput;

// Track current mode ('simple' or 'advanced')
let currentMode = 'simple'; // Default to 簡單模式

// Track current unit mode ('man' or 'regular')
let currentUnit = 'man'; // Default to 萬 (10,000)

// Track current time unit for daily grinding ('hour' or 'minute')
let currentTimeUnit = 'hour'; // Default to 小時

// Flag to prevent auto-save during initial page load
let isInitializing = true;

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
    const hasCustom = document.getElementById('customEvent').checked;

    let couponMinutes = 0;
    let weatherMinutes = 0;
    let customMinutes = 0;
    let couponMultiplier = 0;
    let weatherMultiplier = 0;
    let customMultiplier = 0;

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

    if (hasCustom) {
        const customDuration = parseInt(document.getElementById('customDuration').value);
        customMinutes = customDuration === -1 ? Infinity : customDuration;
        customMultiplier = parseInt(document.getElementById('customBonus').value);
    }

    // Build list of active events with their durations and multipliers
    const activeEvents = [];
    if (hasCoupon) activeEvents.push({ name: 'coupon', duration: couponMinutes, multiplier: couponMultiplier });
    if (hasWeather) activeEvents.push({ name: 'weather', duration: weatherMinutes, multiplier: weatherMultiplier });
    if (hasCustom) activeEvents.push({ name: 'custom', duration: customMinutes, multiplier: customMultiplier });

    // Calculate time distribution across event combinations
    let remainingExp = totalExpNeeded;
    let eventPhases = [];

    // Generate all possible event combinations and calculate their phases
    if (activeEvents.length > 0) {
        let currentTime = 0;
        let currentEvents = [...activeEvents];

        while (currentEvents.length > 0 && remainingExp > 0) {
            // Calculate total multiplier for current active events
            const totalEventMultiplier = currentEvents.reduce((sum, e) => sum + e.multiplier, 0);
            const expRate = baseExpEfficiency * (100 + regularMultiplier + totalEventMultiplier) / (100 + regularMultiplier);
            const expPerMinute = expRate / 10;

            // Find the next event that will expire
            const nextExpiration = Math.min(...currentEvents.map(e => e.duration));
            const phaseDuration = nextExpiration - currentTime;

            const expInPhase = expPerMinute * phaseDuration;

            if (expInPhase >= remainingExp) {
                // This phase completes the grinding
                eventPhases.push({
                    events: currentEvents.map(e => e.name),
                    multiplier: totalEventMultiplier,
                    duration: remainingExp / expPerMinute
                });
                remainingExp = 0;
                break;
            } else {
                // Use full phase duration
                eventPhases.push({
                    events: currentEvents.map(e => e.name),
                    multiplier: totalEventMultiplier,
                    duration: phaseDuration
                });
                remainingExp -= expInPhase;
                currentTime = nextExpiration;

                // Remove expired events
                currentEvents = currentEvents.filter(e => e.duration > currentTime);
            }
        }
    }

    // Phase: No events (regular grinding)
    if (remainingExp > 0) {
        const expPerMinute = regularExpPerTenMin / 10;
        eventPhases.push({
            events: [],
            multiplier: 0,
            duration: remainingExp / expPerMinute
        });
    }

    // Calculate total time
    const totalTimeMinutes = eventPhases.reduce((sum, phase) => sum + phase.duration, 0);
    const hasEvents = hasCoupon || hasWeather || hasCustom;

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

        // Display each phase
        eventPhases.forEach(phase => {
            if (phase.events.length === 0) {
                // No events active
                addBreakdownItem(eventBreakdown, '活動結束後', 0, phase.duration);
            } else {
                // Build label from active events
                const labels = phase.events.map(eventName => {
                    if (eventName === 'coupon') return getCouponLabel(couponMultiplier);
                    if (eventName === 'weather') return getWeatherLabel(weatherMultiplier);
                    if (eventName === 'custom') return '自定義';
                    return eventName;
                });
                const label = labels.join('+');
                addBreakdownItem(eventBreakdown, label, phase.multiplier, phase.duration);
            }
        });

        eventBreakdown.classList.remove('hidden');
    } else {
        eventBreakdown.innerHTML = ''; // Clear old content to prevent stale data from showing
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
    // Don't save during initialization to prevent overwriting saved data with empty values
    if (isInitializing) {
        return;
    }

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
        customEvent: document.getElementById('customEvent').checked,
        customBonus: document.getElementById('customBonus').value,
        customDuration: document.getElementById('customDuration').value,
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

            if (formData.customEvent !== undefined) {
                const customEventCheckbox = document.getElementById('customEvent');
                customEventCheckbox.checked = formData.customEvent;
                toggleEventOptions(customEventCheckbox, customOptions);
            }

            if (formData.customBonus !== undefined) {
                document.getElementById('customBonus').value = formData.customBonus;
            }

            if (formData.customDuration !== undefined) {
                document.getElementById('customDuration').value = formData.customDuration;
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

// Initialize event listeners
function initEventListeners() {
    // Form submit and theme toggle
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

    customEventCheckbox.addEventListener('change', () => {
        toggleEventOptions(customEventCheckbox, customOptions);
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

    // Custom event related
    customEventCheckbox.addEventListener('change', saveToLocalStorage);
    document.getElementById('customBonus').addEventListener('input', saveToLocalStorage);
    document.getElementById('customDuration').addEventListener('input', saveToLocalStorage);

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

    // History feature event listeners
    document.getElementById('recordBtn').addEventListener('click', recordLevelExp);
    document.getElementById('historyToggle').addEventListener('click', toggleHistoryPanel);
    document.getElementById('closeHistory').addEventListener('click', closeHistoryPanel);
    document.getElementById('manageHistory').addEventListener('click', showManageModal);
    document.getElementById('exportHistory').addEventListener('click', exportHistory);
    document.getElementById('importHistory').addEventListener('click', showImportModal);

    // Import modal event listeners
    document.getElementById('closeImportModal').addEventListener('click', hideImportModal);
    document.getElementById('cancelImport').addEventListener('click', hideImportModal);
    document.getElementById('confirmImport').addEventListener('click', confirmImport);

    // Manage modal event listeners
    document.getElementById('closeManageModal').addEventListener('click', hideManageModal);
    document.getElementById('clearAllHistory').addEventListener('click', clearAllHistory);
    document.getElementById('manageSortOrder').addEventListener('change', renderManageRecordList);

    // Close modals on background click
    document.getElementById('importModal').addEventListener('click', (e) => {
        if (e.target.id === 'importModal') {
            hideImportModal();
        }
    });
    document.getElementById('manageModal').addEventListener('click', (e) => {
        if (e.target.id === 'manageModal') {
            hideManageModal();
        }
    });
}

// Initialize DOM elements
function initDOMElements() {
    // Basic form elements
    form = document.getElementById('calcForm');
    currentLevelInput = document.getElementById('currentLevel');
    currentExpInput = document.getElementById('currentExp');
    targetLevelInput = document.getElementById('targetLevel');
    expEfficiencyInput = document.getElementById('expEfficiency');
    resultsDiv = document.getElementById('results');
    startLevelSpan = document.getElementById('startLevel');
    endLevelSpan = document.getElementById('endLevel');
    totalExpSpan = document.getElementById('totalExp');
    regularBonusSpan = document.getElementById('regularBonus');
    timeNeededSpan = document.getElementById('timeNeeded');
    themeToggle = document.getElementById('themeToggle');
    themeIcon = document.querySelector('.theme-icon');
    unitManBtn = document.getElementById('unitMan');
    unitRegularBtn = document.getElementById('unitRegular');

    // Advanced options elements
    advancedOptions = document.getElementById('advancedOptions');
    advancedContent = document.getElementById('advancedContent');
    expCouponCheckbox = document.getElementById('expCoupon');
    couponOptions = document.getElementById('couponOptions');
    weatherEventCheckbox = document.getElementById('weatherEvent');
    weatherOptions = document.getElementById('weatherOptions');
    customEventCheckbox = document.getElementById('customEvent');
    customOptions = document.getElementById('customOptions');
    dailyGrindingInput = document.getElementById('dailyGrindingInput');
    targetDaysInput = document.getElementById('targetDaysInput');
}

// Initialize
function init() {
    // Initialize DOM elements first
    initDOMElements();

    // Initialize event listeners
    initEventListeners();

    // Load saved data and theme
    loadFromLocalStorage();
    loadTheme();

    // Load history
    loadHistory();
    updateRecordCount();

    // Set default placeholder based on current unit
    if (currentUnit === 'man') {
        expEfficiencyInput.placeholder = '輸入每10分鐘獲得的經驗值 (萬)';
    }

    // Enable auto-save after a short delay to ensure everything is loaded
    setTimeout(() => {
        isInitializing = false;
    }, 100);
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

    // Refresh chart if history panel is open
    const historyPanel = document.getElementById('historyPanel');
    if (historyPanel && !historyPanel.classList.contains('hidden')) {
        renderHistoryChart();
    }
}

// Update record count display
function updateRecordCount() {
    const recordCount = document.getElementById('recordCount');
    if (recordCount) {
        const totalRecords = levelHistory.length;

        // Check aggregation status to show appropriate note
        let shouldShowLimitNote = false;
        let noteText = '';

        if (totalRecords > 0) {
            const sortedHistory = [...levelHistory].sort((a, b) => a.timestamp - b.timestamp);

            // Count distinct days with records
            const daysWithRecords = new Set();
            sortedHistory.forEach(record => {
                const date = new Date(record.timestamp);
                const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                daysWithRecords.add(dayKey);
            });

            // Calculate day span
            const firstDate = new Date(sortedHistory[0].timestamp);
            const lastDate = new Date(sortedHistory[sortedHistory.length - 1].timestamp);
            const daySpan = Math.floor((lastDate - firstDate) / (24 * 60 * 60 * 1000));

            const shouldAggregate = daySpan >= 5 && daysWithRecords.size >= 5;

            if (shouldAggregate && daysWithRecords.size > 10) {
                // In aggregated mode and showing limited days
                shouldShowLimitNote = true;
                noteText = '(僅顯示最後10天)';
            } else if (!shouldAggregate && totalRecords > 10) {
                // Not aggregating and showing limited records
                shouldShowLimitNote = true;
                noteText = '(僅顯示最後10筆)';
            }
        }

        if (shouldShowLimitNote) {
            recordCount.textContent = `${totalRecords} 筆資料 ${noteText}`;
        } else {
            recordCount.textContent = `${totalRecords} 筆資料`;
        }
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

// Show manage records modal
function showManageModal() {
    document.getElementById('manageModal').classList.remove('hidden');
    renderManageRecordList();
}

// Hide manage records modal
function hideManageModal() {
    document.getElementById('manageModal').classList.add('hidden');
}

// Render the record list in the manage modal
function renderManageRecordList() {
    const listContainer = document.getElementById('manageRecordList');
    const sortOrder = document.getElementById('manageSortOrder').value;

    if (levelHistory.length === 0) {
        listContainer.innerHTML = '<div class="manage-empty">目前沒有任何紀錄</div>';
        return;
    }

    // Create sorted copy with original indices
    const sortedRecords = levelHistory.map((record, index) => ({ ...record, originalIndex: index }));
    sortedRecords.sort((a, b) => sortOrder === 'desc' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp);

    listContainer.innerHTML = sortedRecords.map(record => {
        const date = new Date(record.timestamp);
        const timeStr = date.toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        return `<div class="manage-record-item" data-index="${record.originalIndex}">
            <div class="manage-record-info">
                <span class="manage-record-time">${timeStr}</span>
                <div class="manage-record-fields">
                    <label class="manage-field">Lv. <input type="number" class="manage-input manage-input-level" value="${record.level}" readonly></label>
                    <label class="manage-field">EXP <input type="number" class="manage-input manage-input-exp" value="${record.exp}" readonly></label>
                </div>
            </div>
            <div class="manage-record-actions">
                <button class="btn-edit-record" onclick="toggleEditRecord(this, ${record.originalIndex})" aria-label="編輯此紀錄">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button class="btn-delete-record" onclick="deleteSingleRecord(${record.originalIndex})" aria-label="刪除此紀錄">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>`;
    }).join('');
}

// Toggle edit mode for a record row
function toggleEditRecord(btn, index) {
    const row = btn.closest('.manage-record-item');
    const levelInput = row.querySelector('.manage-input-level');
    const expInput = row.querySelector('.manage-input-exp');
    const isEditing = !levelInput.readOnly;

    if (isEditing) {
        // Confirm edit
        const newLevel = parseInt(levelInput.value);
        const newExp = parseInt(expInput.value);

        if (!newLevel || newLevel < 1 || newLevel > 200 || isNaN(newExp) || newExp < 0) {
            alert('請輸入有效的等級 (1-200) 和經驗值');
            return;
        }

        if (newLevel < 200) {
            const expNeeded = expData[newLevel].exp;
            if (newExp >= expNeeded) {
                alert(`現在EXP必須小於 ${formatNumber(expNeeded)} (等級 ${newLevel + 1} 所需經驗值)`);
                return;
            }
        }

        levelHistory[index].level = newLevel;
        levelHistory[index].exp = newExp;
        levelHistory[index].totalExp = calculateTotalExp(newLevel, newExp);
        saveHistory();
        updateRecordCount();

        // Refresh chart if history panel is open
        const historyPanel = document.getElementById('historyPanel');
        if (historyPanel && !historyPanel.classList.contains('hidden')) {
            renderHistoryChart();
        }

        // Switch back to readonly
        levelInput.readOnly = true;
        expInput.readOnly = true;
        levelInput.classList.remove('editing');
        expInput.classList.remove('editing');
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>`;
    } else {
        // Enter edit mode
        levelInput.readOnly = false;
        expInput.readOnly = false;
        levelInput.classList.add('editing');
        expInput.classList.add('editing');
        levelInput.focus();
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>`;
    }
}

// Delete a single record by its original index
function deleteSingleRecord(index) {
    if (!confirm('確定要刪除此紀錄嗎？')) {
        return;
    }

    levelHistory.splice(index, 1);
    saveHistory();
    updateRecordCount();
    renderManageRecordList();

    // Refresh chart if history panel is open
    const historyPanel = document.getElementById('historyPanel');
    if (historyPanel && !historyPanel.classList.contains('hidden')) {
        renderHistoryChart();
    }
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
        renderManageRecordList();

        // Refresh chart if history panel is open
        const historyPanel = document.getElementById('historyPanel');
        if (historyPanel && !historyPanel.classList.contains('hidden')) {
            renderHistoryChart();
        }
        alert('所有記錄已清除！');
    } else if (confirmation !== null) {
        alert('輸入不正確，取消刪除');
    }
}

// Export history as JSON file
function exportHistory() {
    if (levelHistory.length === 0) {
        alert('目前沒有記錄可以匯出');
        return;
    }

    // Create JSON string
    const jsonString = JSON.stringify(levelHistory, null, 2);

    // Create blob and download link
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    // Generate filename with current date
    const date = new Date();
    const filename = `artale-exp-records-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}.txt`;

    link.href = url;
    link.download = filename;
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
}

// Show import modal
function showImportModal() {
    const modal = document.getElementById('importModal');
    const textarea = document.getElementById('importTextArea');
    const errorDiv = document.getElementById('importError');

    // Clear previous input and errors
    textarea.value = '';
    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';

    // Show modal
    modal.classList.remove('hidden');
}

// Hide import modal
function hideImportModal() {
    const modal = document.getElementById('importModal');
    modal.classList.add('hidden');
}

// Validate and import history
function confirmImport() {
    const textarea = document.getElementById('importTextArea');
    const errorDiv = document.getElementById('importError');
    const jsonString = textarea.value.trim();

    // Clear previous errors
    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';

    // Validate input
    if (!jsonString) {
        errorDiv.textContent = '請貼上 JSON 資料';
        errorDiv.classList.remove('hidden');
        return;
    }

    try {
        // Parse JSON
        const importedData = JSON.parse(jsonString);

        // Validate data structure
        if (!Array.isArray(importedData)) {
            throw new Error('資料格式錯誤：必須是陣列');
        }

        if (importedData.length === 0) {
            throw new Error('資料為空：沒有記錄可以匯入');
        }

        // Validate each record
        for (let i = 0; i < importedData.length; i++) {
            const record = importedData[i];

            if (!record || typeof record !== 'object') {
                throw new Error(`記錄 ${i + 1} 格式錯誤：必須是物件`);
            }

            if (typeof record.timestamp !== 'number' || record.timestamp <= 0) {
                throw new Error(`記錄 ${i + 1} 的 timestamp 無效`);
            }

            if (typeof record.level !== 'number' || record.level < 1 || record.level > 200) {
                throw new Error(`記錄 ${i + 1} 的 level 無效 (必須在 1-200 之間)`);
            }

            if (typeof record.exp !== 'number' || record.exp < 0) {
                throw new Error(`記錄 ${i + 1} 的 exp 無效`);
            }

            if (typeof record.totalExp !== 'number' || record.totalExp < 0) {
                throw new Error(`記錄 ${i + 1} 的 totalExp 無效`);
            }
        }

        // Ask for confirmation if there are existing records
        if (levelHistory.length > 0) {
            const confirmReplace = confirm(
                `目前已有 ${levelHistory.length} 筆記錄。\n` +
                `匯入 ${importedData.length} 筆新記錄後，將會合併所有記錄。\n\n` +
                `是否繼續？`
            );

            if (!confirmReplace) {
                return;
            }
        }

        // Merge imported data with existing data (avoid duplicates by timestamp)
        const mergedData = [...levelHistory];
        const existingTimestamps = new Set(levelHistory.map(r => r.timestamp));

        importedData.forEach(record => {
            if (!existingTimestamps.has(record.timestamp)) {
                mergedData.push(record);
            }
        });

        // Update history
        levelHistory = mergedData;
        saveHistory();
        updateRecordCount();
        renderHistoryChart();

        // Show success message
        alert(`成功匯入 ${importedData.length} 筆記錄！`);

        // Close modal
        hideImportModal();
    } catch (error) {
        // Show error message
        errorDiv.textContent = `匯入失敗：${error.message}`;
        errorDiv.classList.remove('hidden');
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

    // Check if we should aggregate by day
    let displayHistory;
    let shouldAggregate = false;
    let dateFormat = { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };

    if (sortedHistory.length > 0) {
        // Calculate day span and number of distinct days
        const firstDate = new Date(sortedHistory[0].timestamp);
        const lastDate = new Date(sortedHistory[sortedHistory.length - 1].timestamp);
        const daySpan = Math.floor((lastDate - firstDate) / (24 * 60 * 60 * 1000));

        // Count distinct days with records
        const daysWithRecords = new Set();
        sortedHistory.forEach(record => {
            const date = new Date(record.timestamp);
            const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            daysWithRecords.add(dayKey);
        });

        // Aggregate if span >= 5 days AND has records in >= 5 distinct days
        shouldAggregate = daySpan >= 5 && daysWithRecords.size >= 5;

        if (shouldAggregate) {
            // Group by day and keep only the last record of each day
            const dailyRecords = new Map();
            sortedHistory.forEach(record => {
                const date = new Date(record.timestamp);
                const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                // Always keep the latest record for each day (overwrite previous)
                dailyRecords.set(dayKey, record);
            });

            // Convert map to array and sort by timestamp
            let allDailyRecords = Array.from(dailyRecords.values()).sort((a, b) => a.timestamp - b.timestamp);

            // Show only last 10 days
            displayHistory = allDailyRecords.slice(-10);

            // Use date-only format for x-axis
            dateFormat = { year: 'numeric', month: '2-digit', day: '2-digit' };
        } else {
            // Show latest 10 records with time
            displayHistory = sortedHistory.slice(-10);
        }
    } else {
        displayHistory = sortedHistory;
    }

    // If only 1 record, duplicate it with a slight time offset to show a flat line
    if (displayHistory.length === 1) {
        const singleRecord = displayHistory[0];
        // Create a synthetic earlier point (1 hour before) with the same exp
        const syntheticRecord = {
            timestamp: singleRecord.timestamp - (60 * 60 * 1000), // 1 hour earlier
            level: singleRecord.level,
            exp: singleRecord.exp,
            totalExp: singleRecord.totalExp
        };
        displayHistory = [syntheticRecord, singleRecord];
    }

    // Use uniform distribution with categorical labels for all cases
    const labels = displayHistory.map(record => {
        const date = new Date(record.timestamp);
        return date.toLocaleDateString('zh-TW', dateFormat);
    });
    const data = displayHistory.map(record => record.totalExp);

    // Find min and max levels from displayed history
    const minLevel = Math.min(...displayHistory.map(r => r.level));
    const currentLevel = parseInt(currentLevelInput.value) || displayHistory[displayHistory.length - 1].level;
    const maxLevel = currentLevel + 1;

    // Calculate min and max total EXP for Y-axis
    const minTotalExp = getTotalExpAtLevel(minLevel);
    const maxTotalExp = getTotalExpAtLevel(maxLevel);

    // Generate Y-axis ticks
    const levelRange = maxLevel - minLevel;
    const yAxisTicks = [];

    // Determine percentage markers based on level range
    let percentageMarkers;
    if (levelRange <= 4) {
        percentageMarkers = [0, 50]; // Show 50% markers for small ranges (3-4 levels)
    } else {
        percentageMarkers = [0]; // Show only level boundaries for large ranges (5+ levels)
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

    // X-axis configuration with uniform spacing
    const xAxisConfig = {
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
    };

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
                            const record = displayHistory[context.dataIndex];
                            if (!record) return '';

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
                x: xAxisConfig,
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

