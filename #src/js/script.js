document.addEventListener(
	"DOMContentLoaded",
	function () {
		let arrSlidersProducts = Array.prototype.slice.call(document.querySelectorAll(".product-slider"));

		if (arrSlidersProducts.length > 0) {
			arrSlidersProducts.forEach((element) => {
				let sldier = element.querySelector(".product-slider__container");
				new Swiper(sldier, {
					slidesPerView: "auto",
					spaceBetween: 20,
					watchOverflow: true,
					observer: true,
					observeParents: true,
					autoplay: {
						delay: 4000,
					},

					navigation: {
						nextEl: element.querySelector(".product-slider__next"),
						prevEl: element.querySelector(".product-slider__prev"),
					},

					breakpoints: {
						900: {
							slidesPerView: 4,
							spaceBetween: 20,
						},
					},
				});
			});
		}

		let sldierControls = new Swiper(".controls-slider", {
			slidesPerView: "auto",
			watchOverflow: true,
			spaceBetween: 20,
			freeMode: true,
			breakpoints: {
				768: {
					spaceBetween: 35,
				},
			},
		});

		let sliderCatalog = new Swiper(".slider-catalog", {
			slidesPerView: "auto",
			freeMode: true,
			watchOverflow: true,
			spaceBetween: 10,

			navigation: {
				nextEl: ".catalog__next",
				prevEl: ".catalog__prev",
			},

			scrollbar: {
				el: ".slider-catalog__scrollbar",
				dragSize: 185,
				snapOnRelease: true,
			},

			breakpoints: {
				900: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
			},
		});

		let sliderBrand = new Swiper(".slider-brand", {
			slidesPerView: 1,
			watchOverflow: true,
			spaceBetween: 20,
		});

		let match = [window.matchMedia("(max-width: 768px)"), window.matchMedia("(max-width: 1170px)")];

		let stocks = document.querySelector(".stocks");
		let headerTopindent = 0;

		if (stocks != null) {
			if (document.cookie == "REQ_COOKIE=Y") {
				stocks.style.display = "none";
			} else {
				document.querySelector(".stocks__close").addEventListener("click", (e) => {
					e.preventDefault();
					stocks.style.display = "none";
					document.cookie = "REQ_COOKIE=Y; path=/; domain=" + location.hostname;

					headerTopindent = 0;
				});

				headerTopindent = stocks.clientHeight;

				window.addEventListener("resize", () => {
					headerTopindent = stocks.clientHeight;
				});
			}
		}

		// Меню

		let arrElMenu = Array.prototype.slice.call(document.querySelectorAll(".hover-item"));
		let arrElSubMenu = Array.prototype.slice.call(document.querySelectorAll(".sub-menu"));
		let elMenuHeader = document.querySelector(".menu-header");
		let elHeader = document.querySelector(".header");
		let elMainMenu = document.querySelector(".main-nav");
		let elBurger = document.querySelector(".header__burger");
		let elOverlayMenu = document.querySelector(".overlay-menu");
		let elCloseMobileMenu = Array.prototype.slice.call(document.querySelectorAll(".close-mobile-menu"));

		function showHoverMenu(e) {
			if (e.type == "click") {
				e.preventDefault();
			}

			let idSubMenu = this.dataset.idSubMenu;

			arrElSubMenu.forEach((el) => el.classList.remove("active"));

			arrElMenu.forEach((el) => el.classList.remove("active"));

			this.classList.add("active");

			document.querySelector("#" + idSubMenu).classList.add("active");

			if (!elMenuHeader.classList.contains("show")) {
				elMenuHeader.classList.add("show");
			}
		}

		function closeHoverMenu() {
			if (elMenuHeader.classList.contains("show")) {
				elMenuHeader.classList.remove("show");
			}

			arrElSubMenu.forEach((el) => el.classList.remove("active"));

			arrElMenu.forEach((el) => el.classList.remove("active"));
		}

		function openMobileMenu() {
			elMenuHeader.classList.toggle("show");
			elOverlayMenu.classList.toggle("active");
			document.querySelector("body").classList.toggle("lock");
		}

		function closeMobileMenu() {
			elMenuHeader.classList.remove("show");
			elOverlayMenu.classList.remove("active");
			document.querySelector("body").classList.remove("lock");
		}

		if (elBurger != null) {
			elBurger.addEventListener("click", openMobileMenu);
		}

		if (elCloseMobileMenu.length > 0) {
			elCloseMobileMenu.forEach((element) => {
				element.addEventListener("click", closeMobileMenu);
			});
		}

		function activeMobileMenu() {
			if (match[1].matches) {
				if (arrElMenu.length > 0) {
					arrElMenu.forEach((element) => {
						element.removeEventListener("mouseenter", showHoverMenu);
					});
				}

				if (arrElMenu.length > 0) {
					arrElMenu.forEach((element) => {
						element.addEventListener("click", showHoverMenu);
					});
				}

				if (elHeader != null) {
					elHeader.removeEventListener("mouseleave", closeHoverMenu);
				}

				elMenuHeader.querySelector(".menu-header__wrap").prepend(elMainMenu);

				arrElMenu[0].classList.add("active");
				arrElSubMenu[0].classList.add("active");
			} else {
				if (arrElMenu.length > 0) {
					arrElMenu.forEach((element) => {
						element.addEventListener("mouseenter", showHoverMenu);
					});
				}

				if (arrElMenu.length > 0) {
					arrElMenu.forEach((element) => {
						element.removeEventListener("click", showHoverMenu);
					});
				}

				if (elHeader != null) {
					elHeader.addEventListener("mouseleave", closeHoverMenu);
				}

				elHeader.querySelector(".header__column:first-child").append(elMainMenu);

				closeMobileMenu();

				arrElMenu.forEach((el) => el.classList.remove("active"));
				arrElSubMenu.forEach((el) => el.classList.remove("active"));
			}
		}

		activeMobileMenu();
		match[1].addListener(activeMobileMenu);

		// Выбор языка
		let elLang = document.querySelector(".lang-main");

		if (elLang != null) {
			let clickEl = elLang.querySelector(".lang-main__current");

			clickEl.addEventListener("click", () => {
				if (!elLang.classList.contains("active")) {
					elLang.classList.add("active");
				} else {
					elLang.classList.remove("active");
				}
			});
		}

		document.addEventListener("click", function (e) {
			let elLangActive = document.querySelector(".lang-main");
			if (elLangActive && e.target !== elLangActive && !elLangActive.contains(e.target)) {
				elLangActive.classList.remove("active");
			}
		});

		// Пооиск
		let searchButton = document.querySelector(".search-main");
		let searchPanel = document.querySelector(".search-panel");
		let searchClose = document.querySelector(".search-panel__close");

		if (searchButton != null) {
			searchButton.addEventListener("click", function () {
				searchPanel.classList.toggle("active");
				document.querySelector("body").classList.toggle("lock");
			});
		}

		if (searchClose != null) {
			searchClose.addEventListener("click", function () {
				searchPanel.classList.toggle("active");
				document.querySelector("body").classList.toggle("lock");
			});
		}

		// Переключение главных изображений
		let timerIamge;
		let mainScreenIamge = Array.prototype.slice.call(document.querySelectorAll(".main-screen__bg"));

		if (mainScreenIamge.length > 0) {
			function mainScreenMoveImage() {
				if (match[0].matches) {
					mainScreenIamge[1].style.opacity = 1;
					timerIamge = setInterval(() => {
						if (mainScreenIamge[1].style.opacity == 1) {
							mainScreenIamge[1].style.opacity = 0;
						} else {
							mainScreenIamge[1].style.opacity = 1;
						}
					}, 4000);
				} else {
					clearInterval(timerIamge);
					mainScreenIamge.forEach((element) => {
						element.style.opacity = 1;
					});
				}
			}

			mainScreenMoveImage();
			match[0].addListener(mainScreenMoveImage);
		}

		// Фиксирование шапки при прокрутке
		let header = document.querySelector(".header");

		window.addEventListener("scroll", function (e) {
			if (pageYOffset > headerTopindent) {
				header.classList.add("fixed");
			} else {
				header.classList.remove("fixed");
			}
		});

		// Табы

		let tabContainers = Array.prototype.slice.call(document.querySelectorAll(".js-tab-container"));

		if (tabContainers.length > 0) {
			tabContainers.forEach((element) => {
				let tabItem = Array.prototype.slice.call(element.querySelectorAll(".js-tab-control"));
				let tabContent = Array.prototype.slice.call(element.querySelectorAll(".js-tab-content"));

				tabItem.forEach((el, index, array) => {
					el.addEventListener("click", (e) => {
						if (!el.classList.contains("active")) {
							e.preventDefault();

							let dataId = el.dataset.tabItem;

							let tabContentItem = tabContent.find((item) => {
								if (item.dataset.tabContent == dataId) {
									return item;
								} else {
									return null;
								}
							});

							if (tabContentItem != null) {
								tabItem.forEach((el) => el.classList.remove("active"));
								tabContent.forEach((el) => el.classList.remove("active"));

								el.classList.add("active");

								tabContentItem.classList.add("active");
							}
						}
					});
				});
			});
		}

		// Смена изображений при наведении

		let arrImagesHover = Array.prototype.slice.call(document.querySelectorAll(".js-hover-image"));

		if (arrImagesHover.length > 0) {
			arrImagesHover.forEach((element) => {
				let firstImage = element.querySelector(".js-first-image");
				let secondImage = element.querySelector(".js-second-image");

				if (firstImage != null && secondImage != null) {
					firstImage.style.opacity = 1;

					firstImage.style.transition = "opacity 0.3s ease";

					element.addEventListener("mouseenter", function () {
						firstImage.style.opacity = 0;
					});

					element.addEventListener("mouseleave", function () {
						firstImage.style.opacity = 1;
					});
				}
			});
		}

		lightGallery(document.querySelector(".lightgallery"), {
			plugins: [lgZoom, lgThumbnail],
			selector: "a",
			speed: 500,
			exThumbImage: "data-external-thumb-image",
		});

		let scroller = document.querySelector(".scroller");

		if (scroller != null) {
			scroller.addEventListener("click", function () {
				window.scrollTo({
					top: 0,
					behavior: "smooth",
				});
			});

			window.addEventListener("scroll", function () {
				if (pageYOffset > 0) {
					scroller.classList.add("visabled");
				} else {
					scroller.classList.remove("visabled");
				}
			});
		}

		// Раскрытие фильтров

		let arrFilter = Array.prototype.slice.call(document.querySelectorAll(".js-filter"));

		function fadeInEl(arrElfade, fadeEl) {
			if (!fadeEl.classList.contains("active")) {
				arrElfade.forEach((el) => el.classList.remove("active"));
				fadeEl.classList.add("active");
			} else {
				fadeEl.classList.remove("active");
			}
		}

		function slideToEl(arrElfade, fadeEl) {
			if (!fadeEl.classList.contains("active")) {
				arrElfade.forEach((el) => {
					el.querySelector(".js-filter-wrap").style.height = "0";
					el.classList.remove("active");
				});

				fadeEl.querySelector(".js-filter-wrap").style.height = fadeEl.querySelector(".js-filter-wrap").scrollHeight + "px";

				fadeEl.classList.add("active");
			} else {
				fadeEl.querySelector(".js-filter-wrap").style.height = "0";

				fadeEl.classList.remove("active");
			}
		}

		function closeFilterOutsideWindow(e) {
			let filter = document.querySelector(".js-filter.active");
			if (filter && e.target !== filter && !filter.contains(e.target)) {
				filter.classList.remove("active");
			}
		}

		if (arrFilter.length > 0) {
			let arrFuncFadeIn = [];
			let arrslideToEl = [];

			function filterMobil() {
				if (match[0].matches) {
					arrFilter.forEach((element, index, array) => {
						element.querySelector(".js-filter-click").removeEventListener("click", arrFuncFadeIn[0]);

						arrFuncFadeIn.shift();

						arrslideToEl.push(slideToEl.bind(null, array, array[index]));

						element.querySelector(".js-filter-click").addEventListener("click", arrslideToEl[index]);

						element.querySelector(".js-filter-wrap").style.height = 0;

						document.removeEventListener("click", closeFilterOutsideWindow);
					});
				} else {
					arrFilter.forEach((element, index, array) => {
						element.querySelector(".js-filter-click").removeEventListener("click", arrslideToEl[0]);

						arrslideToEl.shift();

						arrFuncFadeIn.push(fadeInEl.bind(null, array, array[index]));

						element.querySelector(".js-filter-click").addEventListener("click", arrFuncFadeIn[index]);

						element.querySelector(".js-filter-wrap").style.height = element.querySelector(".js-filter-wrap").scrollHeight + "px";

						document.addEventListener("click", closeFilterOutsideWindow);
					});
				}
			}

			filterMobil();
			match[0].addListener(filterMobil);
		}

		let arrRangeSliders = Array.prototype.slice.call(document.querySelectorAll(".js-slider-range"));

		if (arrRangeSliders.length > 0) {
			arrRangeSliders.forEach((element) => {
				let rangeSlider = element.querySelector(".filter-range__slider");
				let inputSliderOne = element.querySelector(".filter-range__input.--one");
				let inputSliderTwo = element.querySelector(".filter-range__input.--two");
				let inputsSlider = [inputSliderOne, inputSliderTwo];
				let minValue = parseInt(inputSliderOne.dataset.minValue);
				let maxValue = parseInt(inputSliderTwo.dataset.maxValue);

				noUiSlider.create(rangeSlider, {
					start: [minValue, maxValue],
					connect: true,
					step: 1,
					range: {
						min: minValue,
						max: maxValue,
					},
				});

				rangeSlider.noUiSlider.on("update", function (values, handle) {
					inputsSlider[handle].value = Math.round(values[handle]);
				});
			});
		}

		let stickyElCardInfo;
		if (document.querySelector(".product__group-sticy") != null) {
			stickyElCardInfo = new Sticksy(".product__group-sticy", { topSpacing: 90, listen: true }, true);
		}

		// Position sticky на js
		let stickyEl;
		if (document.querySelector(".product-reviews__group-all-rev") != null) {
			stickyEl = new Sticksy(".product-reviews__group-all-rev", { topSpacing: 140, listen: true }, true);
		}

		// Раскрытие отзывов

		let reviewsContainer = document.querySelector(".product-reviews__list");
		let buttonViewAllRev = document.querySelector(".product-reviews__button-all");
		let arrReviewsItem = Array.prototype.slice.call(document.querySelectorAll(".product-reviews__item"));

		if (arrReviewsItem.length > 0 && arrReviewsItem.length > 0) {
			if (arrReviewsItem.length < 6) {
				buttonViewAllRev.classList.add("button-hidden");
			} else {
				buttonViewAllRev.classList.add("view-all");
			}

			arrReviewsItem.forEach((el, index) => {
				if (index > 4) {
					el.style.height = "0px";
					el.classList.add("--hidden");
				}
				stickyEl.hardRefresh();
			});
		}

		if (buttonViewAllRev != null) {
			buttonViewAllRev.addEventListener("click", (e) => {
				e.preventDefault();

				arrReviewsItem.forEach((el, index) => {
					if (index > 4) {
						if (el.style.height == "0px") {
							el.classList.remove("--hidden");
							el.style.height = el.scrollHeight + "px";
							buttonViewAllRev.classList.remove("view-all");
						} else {
							el.classList.add("--hidden");
							el.style.height = "0px";
							buttonViewAllRev.classList.add("view-all");
						}
					}
				});

				if (buttonViewAllRev.classList.contains("view-all")) {
					buttonViewAllRev.textContent = "Посмотреть все";
				} else {
					buttonViewAllRev.textContent = "Скрыть";
				}

				setTimeout(() => {
					stickyEl.hardRefresh();
				}, 300);
			});
		}

		// Раскрытие меню в футере
		let arrMenuFooterToggle = document.querySelectorAll(".menu-footer.toggle-menu");

		function footerToggleMenu() {
			console.log(this);
			let listMenu = this.parentNode;

			listMenu.classList.toggle("active");
		}

		function activeClickToogleMenu() {
			if (match[0].matches) {
				if (arrMenuFooterToggle != null) {
					arrMenuFooterToggle.forEach((element) => {
						let menuName = element.querySelector(".menu-footer__name");

						menuName.addEventListener("click", footerToggleMenu);
					});
				}
			} else {
				if (arrMenuFooterToggle != null) {
					arrMenuFooterToggle.forEach((element) => {
						element.classList.remove("active");

						let menuName = element.querySelector(".menu-footer__name");

						menuName.removeEventListener("click", footerToggleMenu);
					});
				}
			}
		}

		activeClickToogleMenu();
		match[0].addListener(activeClickToogleMenu);

		// Мобильные попапы каталога
		let categoryMobilePanel = document.querySelector(".category-catalog__mobile");
		let filterMobilePanel = document.querySelector(".filter-catalog__mobile-panel-filter");
		let listCategory = document.querySelector(".category-catalog__list");

		if (listCategory != null) {
			categoryMobilePanel.querySelector(".moblie-panel-modal__wrap").append(listCategory.cloneNode(true));

			function catalogMobilePanel() {
				if (match[0].matches) {
					if (listCategory.querySelectorAll(".category-catalog__item").length > 5) {
						listCategory.querySelectorAll(".category-catalog__item").forEach((element, index, array) => {
							if (index > 4) {
								element.classList.add("--hidden");
							}
						});

						listCategory.querySelector(".category-catalog__item-all").classList.add("show");
					}
				} else {
					if (listCategory.querySelectorAll(".category-catalog__item").length > 5) {
						listCategory.querySelectorAll(".category-catalog__item").forEach((element, index, array) => {
							element.classList.remove("--hidden");
						});

						listCategory.querySelector(".category-catalog__item-all").classList.remove("show");
					}
				}
			}

			catalogMobilePanel();
			match[0].addListener(catalogMobilePanel);
		}

		let arrMobilePanel = Array.prototype.slice.call(document.querySelectorAll(".moblie-panel-modal"));
		let arrButtonOpenPanel = Array.prototype.slice.call(document.querySelectorAll(".js-open-mobile-panel"));

		if (arrButtonOpenPanel.length > 0) {
			arrButtonOpenPanel.forEach((element) => {
				element.addEventListener("click", function () {
					let idMobilePanel = this.dataset.idMobilePanel;
					arrMobilePanel.forEach((el) => el.classList.remove("active"));
					document.querySelector("#" + idMobilePanel).classList.add("active");
					document.querySelector("body").classList.add("lock");
				});
			});
		}

		if (arrMobilePanel != null) {
			arrMobilePanel.forEach((element) => {
				element.querySelector(".moblie-panel-modal__close").addEventListener("click", function () {
					this.closest(".moblie-panel-modal").classList.remove("active");
					document.querySelector("body").classList.remove("lock");
				});
			});
		}

		const da = new DynamicAdapt("max");
		da.init();
	},
	false
);
