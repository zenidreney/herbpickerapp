import { herbsData } from "./data.js";

const benefitSelect = document.getElementById("benefit");
const getImageBtn = document.getElementById("see-herbs-btn");
const culinaryOnlyOption = document.getElementById("culinary-only-option");
const herbsModalInner = document.getElementById("herbs-modal-inner");
const herbsModal = document.getElementById("herbs-modal");
const herbsModalCloseBtn = document.getElementById("herbs-modal-close-btn");

herbsModalCloseBtn.addEventListener("click", closeModal);
document.body.addEventListener("click", function (e) {
    if (e.target.id != "herbs-modal" && e.target.id != "herb-img") {
        closeModal();
    }
});
getImageBtn.addEventListener("click", function (e) {
    e.stopPropagation();
});

getImageBtn.addEventListener("click", renderHerb);

function closeModal() {
    herbsModal.style.display = "none";
    herbsModalInner.innerHTML = ``;
}

function renderHerb() {
    const herbObject = getMatchingHerbsArray();

    if (herbObject.length === 0) {
        herbsModalInner.innerHTML = `
                                <p>No herbs found</p>
                                `;
    } else {
        for (let i = 0; i < herbObject.length; i++) {
            herbsModalInner.innerHTML += `
                                <a href="${herbObject[i].urlLink}">
                                    <img 
                                        id="herb-img"
                                        class="herb-img" 
                                        src="./media/${herbObject[i].image}"
                                        alt="${herbObject[i].alt}"
                                        >
                                    <p>${herbObject[i].name}</p>
                                </a>
        `;
        }
    }

    herbsModal.style.display = "flex";
}
//
//function getSingleHerbObject() {
//    const herbsArray = getMatchingHerbsArray();
//
//    if (herbsArray.length === 1) {
//        return herbsArray[0];
//    } else {
//        const randomNumber = Math.floor(Math.random() * herbsArray.length);
//        return herbsArray[randomNumber];
//    }
//}

function getMatchingHerbsArray() {
    const selectedBenefit = benefitSelect.value;
    const isCulinary = culinaryOnlyOption.checked;

    const matchingHerbsArray = herbsData.filter(function (herb) {
        if (isCulinary) {
            return herb.benefits.includes(selectedBenefit) && herb.isCulinary;
        } else {
            return herb.benefits.includes(selectedBenefit);
        }
    });
    return matchingHerbsArray;
}

function getBenefitsArray(herbs) {
    const benefitsArray = [];
    for (let herb of herbs) {
        for (let benefit of herb.benefits) {
            if (!benefitsArray.includes(benefit)) {
                benefitsArray.push(benefit);
            }
        }
    }
    return benefitsArray;
}

function renderBenefits(herbs) {
    let selectedItems = ``;
    const benefits = getBenefitsArray(herbs);
    for (let benefit of benefits) {
        selectedItems += `
       
            <option value="${benefit}">${benefit}</option>
            
       `;
    }
    benefitSelect.innerHTML = selectedItems;
}

renderBenefits(herbsData);
