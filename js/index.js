document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        const isArrow = item.closest('.arrow'); // проверяем, есть ли класс arrow выше
    
        if (question) {
            question.addEventListener('click', function () {
                const isOpen = item.classList.contains('active');
    
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherToggle = otherItem.querySelector('.faq-toggle');
                        if (otherToggle) {
                            if (isArrow) {
                                otherToggle.textContent = '🡣';
                            } else {
                                otherToggle.textContent = '+';
                            }
                        }
                    }
                });
    
                if (isOpen) {
                    item.classList.remove('active');
                    toggle.textContent = isArrow ? '🡣' : '+';
                } else {
                    item.classList.add('active');
                    toggle.textContent = isArrow ? '🡡' : '-';
                }
            });
        }
    });
    
            
    
            // Получаем элементы
            const mobileMenu = document.getElementById('headerMobileMenu');
            const menuToggle = document.getElementById('headerMenuToggle');
            const menuClose = document.getElementById('headerMenuClose');
            
            // Функция для открытия меню
            function openMenu() {
                mobileMenu.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
            }
            
            // Функция для закрытия меню
            function closeMenu() {
                mobileMenu.style.display = 'none';
                document.body.style.overflow = ''; // Разрешаем прокрутку страницы
            }
            
            // Нажатие на кнопку открытия меню
            if(menuToggle){
                menuToggle.addEventListener('click', openMenu);
            }
            
            // Нажатие на кнопку закрытия меню
            if(menuClose){
                menuClose.addEventListener('click', closeMenu);
            }
            
            // Функция для проверки размера экрана и установки начального состояния
            function checkScreenSize() {
                if (window.innerWidth > 768) {
                    // Для десктопов всегда закрываем мобильное меню
                    closeMenu();
                }
            }
            
            // Вызываем при загрузке и изменении размера окна
            window.addEventListener('resize', checkScreenSize);
            checkScreenSize();
        

// <!-- <script>
//     document.addEventListener('DOMContentLoaded', function() {
//         // Обработка выпадающего списка
//         const disciplineFilter = document.getElementById('disciplineFilter');
//         const disciplineDropdown = document.getElementById('disciplineDropdown');

//         disciplineFilter.addEventListener('click', function(e) {
//             e.stopPropagation();
//             disciplineDropdown.classList.toggle('active');
//         });

//         // Закрытие выпадающего списка при клике вне его
//         document.addEventListener('click', function(e) {
//             if (!disciplineDropdown.contains(e.target) && e.target !== disciplineFilter) {
//                 disciplineDropdown.classList.remove('active');
//             }
//         });

//         // Все чекбоксы кроме "Все"
//         const checkboxes = document.querySelectorAll('.schedule-checkbox:not(#all)');
//         const allCheckbox = document.getElementById('all');

//         // Когда чекбокс "Все" изменяется
//         allCheckbox.addEventListener('change', function() {
//             checkboxes.forEach(checkbox => {
//                 checkbox.checked = allCheckbox.checked;
//             });
//         });

//         // Когда изменяются другие чекбоксы
//         checkboxes.forEach(checkbox => {
//             checkbox.addEventListener('change', function() {
//                 // Проверяем, все ли чекбоксы отмечены
//                 const allChecked = Array.from(checkboxes).every(cb => cb.checked);
//                 const noneChecked = Array.from(checkboxes).every(cb => !cb.checked);
                
//                 // Обновляем состояние чекбокса "Все"
//                 if (allChecked) {
//                     allCheckbox.checked = true;
//                     allCheckbox.indeterminate = false;
//                 } else if (noneChecked) {
//                     allCheckbox.checked = false;
//                     allCheckbox.indeterminate = false;
//                 } else {
//                     allCheckbox.indeterminate = true;
//                 }
//             });
//         });
//     });

// </script> -->
    // Получаем все фильтры
    const filterButtons = document.querySelectorAll('.schedule-filter');
    
    // Создаем объект с идентификаторами выпадающих списков для каждого фильтра
    const dropdownIds = {
        'disciplineFilter': 'disciplineDropdown',
        'disciplineFilterCourses': 'disciplineDropdownCourses',
        'ageFilterCourses': 'ageDropdownCourses',
        'ageFilter': 'ageDropdown',
        'weightFilter': 'weightDropdown',
        'dateFilter': 'dateDropdown'
    };
    
    // Добавляем обработчики для каждой кнопки фильтра
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Получаем ID кнопки
            const buttonId = this.id;
            
            // Если у кнопки есть ID и для нее определен выпадающий список
            if (buttonId && dropdownIds[buttonId]) {
                const dropdown = document.getElementById(dropdownIds[buttonId]);
                
                // Сначала закрываем все выпадающие списки
                document.querySelectorAll('.schedule-dropdown').forEach(menu => {
                    if (menu !== dropdown) {
                        menu.classList.remove('active');
                    }
                });
                
                // Затем открываем/закрываем нужный
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Закрытие выпадающих списков при клике вне их
    document.addEventListener('click', function(e) {
        const dropdowns = document.querySelectorAll('.schedule-dropdown');
        const isFilterButton = e.target.classList.contains('schedule-filter') || 
                               e.target.closest('.schedule-filter');
        
        if (!isFilterButton) {
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
    
    // Обработка чекбоксов для всех выпадающих списков
    const checkboxGroups = {
        'disciplineDropdown': { all: 'all', items: '.schedule-checkbox:not(#all)' },
        'disciplineDropdownCourses': { all: 'allCourses', items: '.schedule-checkbox-courses:not(#all)' },
        'ageDropdown': { all: 'allAge', items: '.age-checkbox:not(#allAge)' },
        'ageDropdownCourses': { all: 'allAgeCourses', items: '.age-checkbox-courses:not(#allAge)' },
        'weightDropdown': { all: 'allWeight', items: '.weight-checkbox:not(#allWeight)' },
        'dateDropdown': { all: 'allDate', items: '.date-checkbox:not(#allDate)' }
    };
    
    // Для каждой группы чекбоксов настраиваем логику "Все"
    Object.keys(checkboxGroups).forEach(dropdownId => {
        const group = checkboxGroups[dropdownId];
        const allCheckbox = document.getElementById(group.all);
        const itemCheckboxes = document.querySelectorAll(group.items);
        
        if (allCheckbox && itemCheckboxes.length > 0) {
            // Когда чекбокс "Все" изменяется
            allCheckbox.addEventListener('change', function() {
                itemCheckboxes.forEach(checkbox => {
                    checkbox.checked = allCheckbox.checked;
                });
            });
            
            // Когда изменяются другие чекбоксы
            itemCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    // Проверяем, все ли чекбоксы отмечены
                    const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
                    const noneChecked = Array.from(itemCheckboxes).every(cb => !cb.checked);
                    
                    // Обновляем состояние чекбокса "Все"
                    if (allChecked) {
                        allCheckbox.checked = true;
                        allCheckbox.indeterminate = false;
                    } else if (noneChecked) {
                        allCheckbox.checked = false;
                        allCheckbox.indeterminate = false;
                    } else {
                        allCheckbox.indeterminate = true;
                    }
                });
            });
        }
    });


// <!-- <script>
//    // Новый код для мобильных фильтров
// document.addEventListener('DOMContentLoaded', function() {
//     // Получаем элементы мобильных фильтров
//     const filterButtons = document.querySelectorAll('.schedule-filter-btn');
//     const backdrop = document.getElementById('backdrop');
//     const ageFilter = document.getElementById('ageFilterMobile');
//     const accordionFilter = document.getElementById('accordionFilter');
//     const ageAccordionItem = document.getElementById('ageAccordionItem');
//     const dateFromInput = document.getElementById('dateFrom');
//     const dateToInput = document.getElementById('dateTo');
//     const dateFromInputMobile = document.getElementById('dateFromMobile');
//     const dateToInputMobile = document.getElementById('dateToMobile');
    
//     // Открытие мобильного фильтра при клике на кнопку фильтров
//     filterButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             // По умолчанию открываем аккордеон-фильтр (как на втором скриншоте)
//             accordionFilter.classList.add('active');
//             backdrop.classList.add('active');
//             document.body.style.overflow = 'hidden';
//         });
//     });
    
//     // Закрытие при клике на затемнение
//     backdrop.addEventListener('click', function() {
//         ageFilter.classList.remove('active');
//         accordionFilter.classList.remove('active');
//         backdrop.classList.remove('active');
//         document.body.style.overflow = '';
//     });
    
//     // Открытие возрастного фильтра при клике на "Возраст"
//     if (ageAccordionItem) {
//         ageAccordionItem.querySelector('.accordion-header').addEventListener('click', function() {
//             // Закрываем основной фильтр и открываем возрастной
//             accordionFilter.classList.remove('active');
//             ageFilter.classList.add('active');
//         });
//     }
    
//     // Обработка кнопки "Применить" в возрастном фильтре
//     const ageFilterApply = document.getElementById('ageFilterApply');
//     if (ageFilterApply) {
//         ageFilterApply.addEventListener('click', function() {
//             // Закрываем возрастной фильтр и открываем основной
//             ageFilter.classList.remove('active');
//             accordionFilter.classList.add('active');
            
//             // Здесь можно добавить логику применения фильтра возраста
//             console.log('Фильтр возраста применен');
//         });
//     }
    
//     // Обработка кнопки "Применить" в основном фильтре
//     const applyButton = document.querySelector('.mobile-filter-apply');
//     if (applyButton) {
//         applyButton.addEventListener('click', function() {
//             // Закрываем все фильтры
//             ageFilter.classList.remove('active');
//             accordionFilter.classList.remove('active');
//             backdrop.classList.remove('active');
//             document.body.style.overflow = '';
            
//             // Здесь можно добавить логику применения всех фильтров
//             console.log('Все фильтры применены');
//         });
//     }
    
//     // Обработка полей ввода даты (подключение календаря)
//     // Здесь можно подключить системный календарь
//     if (dateFromInput && dateToInput) {
//         dateFromInput.addEventListener('focus', function() {
//             // Проверка типа устройства для выбора подходящего календаря
//             if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
//                 // Для мобильных устройств используем тип date
//                 this.type = 'date';
//             } else {
//                 // Можно подключить JavaScript-календарь
//                 // Например, flatpickr или аналогичный
//                 console.log('Открываем календарь для даты начала');
//             }
//         });
        
//         dateToInput.addEventListener('focus', function() {
//             if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
//                 this.type = 'date';
//             } else {
//                 console.log('Открываем календарь для даты окончания');
//             }
//         });
//     }
//     if (dateFromInputMobile && dateToInputMobile) {
//         dateFromInputMobile.addEventListener('focus', function() {
//             // Проверка типа устройства для выбора подходящего календаря
//             if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
//                 // Для мобильных устройств используем тип date
//                 this.type = 'date';
//             } else {
//                 // Можно подключить JavaScript-календарь
//                 // Например, flatpickr или аналогичный
//                 console.log('Открываем календарь для даты начала');
//             }
//         });
        
//         dateToInputMobile.addEventListener('focus', function() {
//             if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
//                 this.type = 'date';
//             } else {
//                 console.log('Открываем календарь для даты окончания');
//             }
//         });
//     }
// });
    
    
    
// document.addEventListener('DOMContentLoaded', function() {
//             const segmentOptions = document.querySelectorAll('.segment-option');
            
//             segmentOptions.forEach(option => {
//                 option.addEventListener('click', function() {
//                     // Remove active class from all options
//                     segmentOptions.forEach(opt => {
//                         opt.classList.remove('active');
//                     });
                    
//                     // Add active class to clicked option
//                     this.classList.add('active');
//                 });
//             });

//             // Обработка кнопки "Применить"
//             const applyButton = document.querySelector('.mobile-filter-apply');
//             applyButton.addEventListener('click', function() {
//                 // Здесь можно добавить логику применения фильтра
//                 console.log('Фильтр возраста применен');
//             });
//         });



        
//     </script> -->

    // Получаем элементы мобильных фильтров
    const filterButtonsMobile = document.querySelectorAll('.schedule-filter-btn');
    const backdrop = document.getElementById('backdrop');
    
    // Основной аккордеон-фильтр
    const accordionFilter = document.getElementById('accordionFilter');
    
    // Отдельные фильтры
    const ageFilter = document.getElementById('ageFilterMobile');
    const disciplineFilter = document.getElementById('disciplineFilterMobile');
    const levelFilter = document.getElementById('levelFilterMobile');
    const weightFilter = document.getElementById('weightFilterMobile');
    
    // Элементы аккордеона
    const ageAccordionItem = document.getElementById('ageAccordionItem');
    const disciplineAccordionItem = document.getElementById('disciplineAccordionItem');
    const levelAccordionItem = document.getElementById('levelAccordionItem');
    const weightAccordionItem = document.getElementById('weightAccordionItem');
    
    // Инициализация segment controls для всех фильтров
    const initSegmentControl = function(container) {
        if (!container) return;
        
        const segmentOptions = container.querySelectorAll('.segment-option');
        segmentOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                segmentOptions.forEach(opt => {
                    opt.classList.remove('active');
                });
                
                // Add active class to clicked option
                this.classList.add('active');
            });
        });
    };
    
    // Инициализируем переключатели для всех фильтров
    initSegmentControl(ageFilter);
    initSegmentControl(disciplineFilter);
    initSegmentControl(levelFilter);
    initSegmentControl(weightFilter);
    
    // Открытие мобильного фильтра при клике на кнопку фильтров
    filterButtonsMobile.forEach(button => {
        button.addEventListener('click', function() {
            accordionFilter.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Закрытие при клике на затемнение
    if(backdrop){
        backdrop.addEventListener('click', function() {
            // Закрываем все фильтры
            ageFilter.classList.remove('active');
            disciplineFilter.classList.remove('active');
            levelFilter.classList.remove('active');
            weightFilter.classList.remove('active');
            accordionFilter.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Функция для открытия конкретного фильтра
    const openSpecificFilter = function(accordion, filter) {
        if (!accordion || !filter) return;
        
        accordion.querySelector('.accordion-header').addEventListener('click', function() {
            // Закрываем основной фильтр и открываем нужный
            accordionFilter.classList.remove('active');
            filter.classList.add('active');
        });
    };
    
    // Открытие конкретных фильтров при клике на соответствующие заголовки аккордеона
    openSpecificFilter(ageAccordionItem, ageFilter);
    openSpecificFilter(disciplineAccordionItem, disciplineFilter);
    openSpecificFilter(levelAccordionItem, levelFilter);
    openSpecificFilter(weightAccordionItem, weightFilter);
    
    // Функция для обработки кнопки "Применить" в конкретном фильтре
    const handleApplyButton = function(button, filter) {
        if (!button) return;
        
        button.addEventListener('click', function() {
            // Закрываем текущий фильтр и открываем основной
            filter.classList.remove('active');
            accordionFilter.classList.add('active');
            
            // Здесь можно добавить логику применения фильтра
            console.log(`Фильтр ${filter.id} применен`);
        });
    };
    
    // Обработка кнопок "Применить" во всех фильтрах
    handleApplyButton(document.getElementById('ageFilterApply'), ageFilter);
    handleApplyButton(document.getElementById('disciplineFilterApply'), disciplineFilter);
    handleApplyButton(document.getElementById('levelFilterApply'), levelFilter);
    handleApplyButton(document.getElementById('weightFilterApply'), weightFilter);
    
    // Обработка кнопки "Применить" в основном фильтре
    const mainApplyButton = document.querySelector('.mobile-filter-apply');
    if (mainApplyButton) {
        mainApplyButton.addEventListener('click', function() {
            // Закрываем все фильтры
            ageFilter.classList.remove('active');
            disciplineFilter.classList.remove('active');
            levelFilter.classList.remove('active');
            weightFilter.classList.remove('active');
            accordionFilter.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
            
            // Здесь можно добавить логику применения всех фильтров
            console.log('Все фильтры применены');
        });
    }


    // Получаем элементы
    const openPopupBtns = document.querySelectorAll('.schedule-join-btn');
    const popup = document.getElementById('registrationPopup');
    const closePopupBtn = document.getElementById('closePopupBtn');
    
    // Функция открытия попапа
    function openPopup() {
        popup.style.display = 'flex';
        // Анимация появления
        setTimeout(() => {
            popup.style.opacity = '1';
        }, 10);
        // Блокируем прокрутку страницы
        document.body.style.overflow = 'hidden';
    }
    
    // Функция закрытия попапа
    function closePopup() {
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 200);
        // Разблокируем прокрутку страницы
        document.body.style.overflow = '';
    }
    
    // Назначаем обработчики событий
    
    if (openPopupBtns.length > 0) {
        openPopupBtns.forEach(btn => {
            btn.addEventListener('click', openPopup);
        });
    }
    if(closePopupBtn){
        closePopupBtn.addEventListener('click', closePopup);
    }
    
    // Закрытие по клику на подложку (вне попапа)
    if(popup){
        popup.addEventListener('click', function(event) {
            if (event.target === popup) {
                closePopup();
            }
        });
    }
    


    
  // Получаем элементы
const filterButton = document.querySelector('.blog-filter-button');
const mobileTagsMenu = document.getElementById('mobileTags');

// Функция для открытия/закрытия меню тегов
function toggleMobileTagsMenu() {
    mobileTagsMenu.classList.toggle('active');
}

// Обработчик нажатия на кнопку фильтров
// Используем stopPropagation в конце, а не в начале функции
if(filterButton){
    filterButton.addEventListener('click', function(event) {
        toggleMobileTagsMenu();
        event.stopPropagation(); // Предотвращаем всплытие события
    });
}

// Закрытие меню при клике вне его
document.addEventListener('click', function(event) {
    // Проверяем, что клик был не внутри меню и не на кнопке или её дочерних элементах
    if(mobileTagsMenu!=null && filterButton!=null){
        if (!mobileTagsMenu.contains(event.target) && !filterButton.contains(event.target)) {
            mobileTagsMenu.classList.remove('active');
        }
    }
});




    // Получаем элементы
    const openPopupBtnsCourses = document.querySelectorAll('.courses-enroll-btn');
    const popupCourses = document.getElementById('registrationPopup');
    const closePopupBtnCourses = document.getElementById('closePopupBtn');
    
    // Функция открытия попапа
    function openPopupCourses() {
        popupCourses.style.display = 'flex';
        // Анимация появления
        setTimeout(() => {
            popupCourses.style.opacity = '1';
        }, 10);
        // Блокируем прокрутку страницы
        document.body.style.overflow = 'hidden';
    }
    
    // Функция закрытия попапа
    function closePopupCourses() {
        popupCourses.style.opacity = '0';
        setTimeout(() => {
            popupCourses.style.display = 'none';
        }, 200);
        // Разблокируем прокрутку страницы
        document.body.style.overflow = '';
    }
    
    // Назначаем обработчики событий
    if (openPopupBtnsCourses.length > 0) {
        openPopupBtnsCourses.forEach(btn => {
            btn.addEventListener('click', openPopupCourses);
        });
    }
    if(closePopupBtnCourses){
        closePopupBtnCourses.addEventListener('click', closePopupCourses);
    }
    
    // Закрытие по клику на подложку (вне попапа)
    if(popupCourses){
        popupCourses.addEventListener('click', function(event) {
            if (event.target === popupCourses) {
                closePopupCourses();
            }
        });
    }
    
















    const scrollContainer = document.querySelector('.schedule-tournaments-wrapper');
    
    if (scrollContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        
        // Обработчик нажатия кнопки мыши
        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
            
            // Предотвращаем выделение текста при перетаскивании
            e.preventDefault();
        });
        
        // Обработчик отпускания кнопки мыши
        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        // Обработчик выхода курсора за пределы контейнера
        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        // Обработчик движения мыши
        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            // Здесь определяем скорость скролла, можно настроить под нужды
            const walk = (x - startX) * 1.5; 
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
        
        
        // Дополнительно добавляем поддержку для сенсорных экранов
        let touchStartX;
        let touchScrollLeft;
        
        scrollContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX - scrollContainer.offsetLeft;
            touchScrollLeft = scrollContainer.scrollLeft;
        }, { passive: true });
        
        scrollContainer.addEventListener('touchmove', (e) => {
            if (!touchStartX) return;
            const x = e.touches[0].pageX - scrollContainer.offsetLeft;
            const walk = (x - touchStartX) * 1.5;
            scrollContainer.scrollLeft = touchScrollLeft - walk;
        }, { passive: true });
        
        scrollContainer.addEventListener('touchend', () => {
            touchStartX = null;
        }, { passive: true });
    }












    const scrollContainerCourses = document.querySelector('.courses-list-wrapper');
    if (scrollContainerCourses) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        
        // Обработчик нажатия кнопки мыши
        scrollContainerCourses.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainerCourses.style.cursor = 'grabbing';
            startX = e.pageX - scrollContainerCourses.offsetLeft;
            scrollLeft = scrollContainerCourses.scrollLeft;
            
            // Предотвращаем выделение текста при перетаскивании
            e.preventDefault();
        });
        
        // Обработчик отпускания кнопки мыши
        scrollContainerCourses.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainerCourses.style.cursor = 'grab';
        });
        
        // Обработчик выхода курсора за пределы контейнера
        scrollContainerCourses.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainerCourses.style.cursor = 'grab';
        });
        
        // Обработчик движения мыши
        scrollContainerCourses.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainerCourses.offsetLeft;
            // Здесь определяем скорость скролла, можно настроить под нужды
            const walk = (x - startX) * 1.5; 
            scrollContainerCourses.scrollLeft = scrollLeft - walk;
        });
        
        // Устанавливаем стиль курсора при наведении
        scrollContainerCourses.style.cursor = 'grab';
        
        // Дополнительно добавляем поддержку для сенсорных экранов
        let touchStartX;
        let touchScrollLeft;
        
        scrollContainerCourses.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX - scrollContainerCourses.offsetLeft;
            touchScrollLeft = scrollContainerCourses.scrollLeft;
        }, { passive: true });
        
        scrollContainerCourses.addEventListener('touchmove', (e) => {
            if (!touchStartX) return;
            const x = e.touches[0].pageX - scrollContainerCourses.offsetLeft;
            const walk = (x - touchStartX) * 1.5;
            scrollContainerCourses.scrollLeft = touchScrollLeft - walk;
        }, { passive: true });
        
        scrollContainerCourses.addEventListener('touchend', () => {
            touchStartX = null;
        }, { passive: true });
    }



    
});