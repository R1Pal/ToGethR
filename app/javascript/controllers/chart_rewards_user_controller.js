import { Controller } from "@hotwired/stimulus";
import { Chart } from "chart.js";
import * as Chartjs from "chart.js" ;

// Register all Chartjs controllers (dans le fichier Index dans l'exo 5 Stimulus)
const controllers = Object.values(Chartjs).filter(
  (chart) => chart.id !== undefined
) ;
Chart.register(...controllers) ;

// Connects to data-controller="chart"

export default class extends Controller {

  static targets = ["", "", ""]

  static values = {
    keystring: String,
    keynumber: Number,
    rewards: Object
  }

  connect() {

    console.log("hello from user rewards chart")

    // const labels = Object.keys(this.worldPopulation);
    // const data = Object.values(this.worldPopulation);
    // console.log(labels);
    // console.log(data);

    new Chart(
      this.element,
      {
        type: 'bar',
        data: {
          labels: ["a", "b", "c"],
          datasets: [
            {
              label: 'Gender Ratio',
              data: [10, 20, 30],
              backgroundColor: [
                'rgb(32, 13, 92)',
                'rgb(128, 89, 255)',
                'rgb(226, 100, 108)'
              ],
              hoverOffset: 4
            }
          ]
        },

        options: {
          scales: {
            x: {
              reverse: true
            }
          },
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 2,
            }
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              display: false
            },
            // title: {
            //   display: true,
            //   text: 'Chart.js Horizontal Bar Chart'
            //  }
          }
        }
      }
    );
  }
}
