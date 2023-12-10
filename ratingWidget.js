class RatingWidget extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .star {
                    font-size: 50px;
                    color: gray;
                }
                .selected-star{
                    color: yellow;
                }
                .star:hover {
                    cursor: pointer;
                }
            </style>
            <div>
                <span id="1" class="star">&#9733;</span>
                <span id="2" class="star">&#9733;</span>
                <span id="3" class="star">&#9733;</span>
                <span id="4" class="star">&#9733;</span>
                <span id="5" class="star">&#9733;</span>
                <span id="rating-feedback" hidden>Thanks for your 4 star rating!</span>
            </div>
        `;
    }

    connectedCallback() {
        let starElements = this.shadowRoot.querySelectorAll(".star");
        let ratingForm = document.getElementById("rating-form");

        starElements.forEach((element) => {
            element.addEventListener("mouseout", () => {
                for (var i=0; i<starElements.length; i++) {
                    starElements.item(i).classList.remove("selected-star")
                }
            });

            element.addEventListener("mouseover", (event) => {
                let hoveredElement = event.originalTarget.id;

                for (var i=0; i<starElements.length; i++) {

                    if (i < hoveredElement) {
                        starElements.item(i).classList.add("selected-star")
                    } else {
                        starElements.item(i).classList.remove("selected-star")
                    }
                }
            });

            element.addEventListener("click", (event) => {
                starElements.forEach((element) => element.hidden=true);

                let selectedValue = event.originalTarget.id;
                let ratingFeedBackElement = this.shadowRoot.getElementById("rating-feedback");

                if (selectedValue >= 4) {
                    ratingFeedBackElement.textContent = `Thanks for your ${selectedValue} star rating!`;
                } else {
                    ratingFeedBackElement.textContent = `Thanks for your feedback of ${selectedValue} stars. We'll try to do better!`;
                }
                ratingFeedBackElement.hidden = false;

                let request = new XMLHttpRequest();
                request.open("POST", "https://httpbin.org/post");

                request.setRequestHeader("X-Sent-By", "JS");

                let formData = new FormData(ratingForm);
                formData.set("rating", String(selectedValue));
                formData.set("sentBy", "JS");

                request.send(formData);
            })
        });
    }
}

customElements.define("rating-widget", RatingWidget);