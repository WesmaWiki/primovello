document.addEventListener(
	"DOMContentLoaded",
	function () {
		let sliderMainScreen = new Swiper(".slider-main-screen", {
			slidesPerView: 1,
			watchOverflow: true,
			loop: true,
			autoplay: {
				delay: 4000,
			},
		});

		let arrSlidersNewArrivals = Array.prototype.slice.call(document.querySelectorAll(".tab-new-arrivals__content"));

		if (arrSlidersNewArrivals != null) {
			arrSlidersNewArrivals.forEach((element) => {
				let sldier = element.querySelector(".tab-new-arrivals__sldier");
				new Swiper(sldier, {
					slidesPerView: 3,
					spaceBetween: 20,
					watchOverflow: true,
					observer: true,
					observeParents: true,
					autoplay: {
						delay: 4000,
					},

					navigation: {
						nextEl: element.querySelector(".tab-new-arrivals__next"),
						prevEl: element.querySelector(".tab-new-arrivals__prev"),
					},

					on: {
						init: () => {
							animImageHover();
						},

						observerUpdate: () => {
							animImageHover();
						},
					},
				});
			});
		}

		let sliderCatalog = new Swiper(".slider-catalog", {
			slidesPerView: 3,
			freeMode: true,
			watchOverflow: true,
			spaceBetween: 20,

			navigation: {
				nextEl: ".catalog__next",
				prevEl: ".catalog__prev",
			},

			scrollbar: {
				el: ".slider-catalog__scrollbar",
				dragSize: 190,
			},
		});

		let sliderBrand = new Swiper(".slider-brand", {
			slidesPerView: 1,
			watchOverflow: true,
			spaceBetween: 20,
		});

		// Фиксирование шапки при прокрутке
		let target = document.querySelector(".header");
		let targetTopPage = target.getBoundingClientRect().top;

		window.addEventListener("scroll", function (e) {
			if (pageYOffset > targetTopPage) {
				target.classList.add("fixed");
			} else {
				target.classList.remove("fixed");
			}
		});

		window.addEventListener("resize", () => (targetTopPage = target.getBoundingClientRect().top));

		if (document.cookie == "REQ_COOKIE=Y") {
			document.querySelector(".stocks").style.display = "none";
			targetTopPage = target.getBoundingClientRect().top;
		} else {
			let stocks = document.querySelector(".stocks__close");

			if (stocks != null) {
				stocks.addEventListener("click", (e) => {
					e.preventDefault();
					document.querySelector(".stocks").style.display = "none";
					document.cookie = "REQ_COOKIE=Y; path=/; domain=" + location.hostname;
					targetTopPage = target.getBoundingClientRect().top;
				});
			}
		}

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

		function animImageHover() {
			let arrImagesHover = Array.prototype.slice.call(document.querySelectorAll(".js-hover-image"));

			if (arrImagesHover != null) {
				arrImagesHover.forEach((element) => {
					let firstImage = element.querySelector(".js-first-image");
					let secondImage = element.querySelector(".js-second-image");

					if (firstImage != null && secondImage != null) {
						firstImage.style.opacity = 1;

						firstImage.style.transition = "opacity 0.3s ease";

						secondImage.style.transform = `translateX(-${firstImage ? firstImage.clientWidth : null}px)`;

						element.addEventListener("mouseenter", function () {
							firstImage.style.opacity = 0;
						});

						element.addEventListener("mouseleave", function () {
							firstImage.style.opacity = 1;
						});
					}
				});
			}
		}
		animImageHover();

		window.addEventListener("resize", animImageHover);

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
	},
	false
);
