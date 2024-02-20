document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".seats");
    const applyCouponButton = document.getElementById("applyCoupon");
    const noOfSeats = document.getElementById("noOfSeats");
    const seatsLeft = document.getElementById("seat-left");
    const selectedSeatsList = document.getElementById("selectedSeats");
    const totalPriceElement = document.getElementById("totalPrice");
    const grandTotl = document.getElementById("grandTotal");
    const couponForm = document.getElementById("couponForm");
    const couponInput = document.getElementById("couponCode");
    const couponMessage = document.getElementById("couponMessage");

    const form = document.getElementById("passengerInfo");
    const phoneInput = document.getElementById("phone");
    const submitBtn = document.getElementById("passengerInfoButton");
    const modal = document.getElementById("myModal");

    let selectedSeats = [];
    const ticketPrice = 550;

    function createSeats() {
        const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        for (let row of rows) {
            const rowLabel = document.createElement("div");
            rowLabel.textContent = row;
            rowLabel.className = "letter";
            if (row == "I") {
                rowLabel.classList.add("margin-right");
            }
            container.appendChild(rowLabel);
            container.appendChild(document.createTextNode(" "));

            for (let i = 1; i <= 4; i++) {
                const seat = document.createElement("div");
                seat.className = "seat";
                seat.textContent = row + i;
                if (i === 2) {
                    seat.classList.add("gutter-right");
                } else if (i === 3) {
                    seat.classList.add("gutter-left");
                }
                seat.addEventListener("click", function () {
                    toggleSeatSelection(seat);
                });
                container.appendChild(seat);
            }

            container.appendChild(document.createElement("br"));
        }
    }

    function toggleSeatSelection(seat) {
        const seatNumber = seat.textContent;
        const index = selectedSeats.indexOf(seatNumber);
        if (index === -1) {
            if (selectedSeats.length < 4) {
                selectedSeats.push(seatNumber);
                seat.classList.add("selected");
            }
        } else {
            selectedSeats.splice(index, 1);
            seat.classList.remove("selected");
        }
        updateSelectedSeatsList();
        updateCouponButton();
        checknumber();
        checkseatslength();
    }

    function updateSelectedSeatsList() {
        selectedSeatsList.innerHTML = "";
        selectedSeats.forEach(function (seat) {
            const listItem = document.createElement("div");
            listItem.className = "row";
            const childDiv1 = document.createElement("div");
            childDiv1.className = "col-4 seat-details-table";
            const childDiv2 = document.createElement("div");
            childDiv2.className = "col-4 text-center seat-details-table";
            const childDiv3 = document.createElement("div");
            childDiv3.className = "col-4 text-end seat-details-table";
            listItem.appendChild(childDiv1);
            listItem.appendChild(childDiv2);
            listItem.appendChild(childDiv3);
            childDiv1.textContent = seat;
            childDiv2.textContent = "Economy";
            childDiv3.textContent = ticketPrice;
            selectedSeatsList.appendChild(listItem);
        });
        noOfSeats.innerHTML = "";
        noOfSeats.innerHTML = selectedSeats.length;
        seatsLeft.innerHTML = "40";
        seatsLeft.innerHTML = 40 - selectedSeats.length;
        calculateTotalPrice();
    }
    function calculateTotalPrice() {
        const total = selectedSeats.length * ticketPrice;
        totalPriceElement.textContent = total;

        grandTotl.textContent = total;
    }

    function updateCouponButton() {
        if (selectedSeats.length >= 4) {
            applyCouponButton.removeAttribute("disabled");
            couponForm.style.display = "block";
        } else {
            applyCouponButton.setAttribute("disabled", "true");
            couponForm.style.display = "none";
        }
    }

    couponForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const enteredCouponCode = couponInput.value.trim().toLowerCase();
        const validCouponCodes = ["new15", "couple20", "couple 20", "new 15"].map((code) => code.toLowerCase());
        if (validCouponCodes.includes(enteredCouponCode)) {
            applyCoupon(enteredCouponCode);
            couponMessage.classList.remove("text-danger");
            couponMessage.classList.add("text-success");
            couponMessage.textContent = "Coupon applied successfully!";
        } else {
            couponMessage.classList.remove("text-success");
            couponMessage.classList.add("text-danger");
            couponMessage.textContent = "**Inavlid Coupon**";
        }

        function applyCoupon(couponCode) {
            const lastTwoLetters = couponCode.slice(-2);
            const firstDigit = parseInt(lastTwoLetters[0], 36);
            const secondDigit = parseInt(lastTwoLetters[1], 36);
            const percentage = parseInt(`${firstDigit}${secondDigit}`, 10);
            const total = selectedSeats.length * ticketPrice;
            const grandTotal = total - (total * percentage) / 100;

            grandTotl.textContent = grandTotal;
        }
    });

    function checknumber() {
        phoneInput.addEventListener("input", function () {
            submitBtn.disabled = !phoneInput.value.trim();
            checkseatslength();
        });
    }

    function checkseatslength() {
        if (selectedSeats.length < 1) {
            submitBtn.disabled = true;
        } else {
            submitBtn.removeAttribute = "disabled";
        }
    }
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        modal.style.display = "flex";
    });
    document.getElementById("closeBtn").addEventListener("click", hideModal);
    function hideModal() {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    createSeats();
});
