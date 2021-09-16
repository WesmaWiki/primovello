document.addEventListener(
	"DOMContentLoaded",
	function () {
		let arrSlidersProducts = Array.prototype.slice.call(document.querySelectorAll(".product-slider"));

		if (arrSlidersProducts != null) {
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

		let match = [window.matchMedia("(max-width: 768px)")];

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
		let mainScreenIamge = document.querySelectorAll(".main-screen__bg");

		if (mainScreenIamge != null) {
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
		}

		mainScreenMoveImage();
		match[0].addListener(mainScreenMoveImage);

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

		if (tabContainers != null) {
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

		if (arrImagesHover != null) {
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

		let arrFilter = Array.prototype.slice.call(document.querySelectorAll(".js-filter"));

		if (arrFilter != null) {
			arrFilter.forEach((element, index, array) => {
				let buttonFilter = element.querySelector(".js-filter-click");

				buttonFilter.addEventListener("click", () => {
					if (!element.classList.contains("active")) {
						array.forEach((el) => el.classList.remove("active"));
						element.classList.add("active");
					} else {
						element.classList.remove("active");
					}
				});
			});
		}

		document.addEventListener("click", function (e) {
			let filter = document.querySelector(".js-filter.active");
			if (filter && e.target !== filter && !filter.contains(e.target)) {
				filter.classList.remove("active");
			}
		});

		let arrRangeSliders = Array.prototype.slice.call(document.querySelectorAll(".js-slider-range"));

		if (arrRangeSliders != null) {
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

		if (arrReviewsItem != null && arrReviewsItem.length > 0) {
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
	},
	false
);
