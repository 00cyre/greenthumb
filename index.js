
window.addEventListener('load', (event) => {
    var selectGroup = document.getElementsByClassName("select-input")
    const searchGreen = (sun, water, pets) => {
        document.getElementById("loading-container").style.visibility = "visible"
        document.getElementsByClassName("no-results-container")[0].style.visibility = "hidden"
        console.log(sun, water, pets)
        fetch(`
        https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pets}`,
            {
                "method": "GET",
                "mode": "cors",
            }
        ).then(response => response.json())
            .then(data => {
        document.getElementsByClassName("top-picks")[0].style.visibility = "visible"

                document.getElementById("loading-container").style.visibility = "hidden"
                var res = document.getElementById("results-main")
                res.style.visibility = "visible"
                res.style.overflow = "unset"
                res.style.height = "34vh"
                var results = document.getElementById("results-container")
                results.style.visibility = "visible";
                data = data.sort(e => e.staff_favorite)
                var def = {
                    sun: {
                        high: require('./images/icons/high-sun.svg'),
                        low: require('./images/icons/low-sun.svg'),
                        no: require('./images/icons/no-sun.svg')
                    },
                    water: {
                        rarely: require('./images/icons/1-drop.svg'),
                        regularly: require('./images/icons/2-drops.svg'),
                        daily: require('./images/icons/3-drops.svg'),
                    },
                    pets: {
                        false: require('./images/icons/pet.svg'),
                        true: require('./images/icons/toxic.svg')
                    }
                }
                results.innerHTML = ''
                var counter = 0;
                data.forEach(element => {
                    var child = document.createElement('div');
                    child.innerHTML = ` <img class="green-image" src="${element.url}" alt="" srcset="">
                    ${counter == 0 ? `<div class="staff-favorite">
                    ✨ Staff favorite
                    </div>` : ""}
                    <div class="green-item">
                      <span class="green-name">
                        ${element.name}
                      </span>
                      <div class="green-right-info">
                      <span class="price">$${element.price}</span>
                        <div class="green-icons">
                        <img src="${def["pets"][element.toxicity]}" alt="">
                          <img src="${def["sun"][element.sun]}" alt="" srcset="">
                          <img src="${def["water"][element.water]}" alt="" srcset="">
                        </div>
                      </div>
                    </div>`;
                    child.setAttribute("class", "green-container")
                    results.appendChild(child);
                    counter ++;
                });
                console.log(data)
            })
    }
    for (let index = 0; index < selectGroup.length; index++) {
        const element = selectGroup[index];
        element.addEventListener('change', (event) => {
            if (Array.from(selectGroup).filter(e => e.value != 'null').length == 3) {
                searchGreen(
                    selectGroup.sunlight.value,
                    selectGroup.water.value,
                    selectGroup.pets.value
                )
            }
        })
    }
});