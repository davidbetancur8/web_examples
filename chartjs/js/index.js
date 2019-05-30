window.addEventListener('load', setup);
async function setup() {
const ctx = document.getElementById('MyChart').getContext('2d');
const globalData = await getData();


const myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: globalData.years,
    datasets: [
        {
        label: 'Electricity productivity',
        data: globalData.data1,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',

        },
        {
        label: 'Electricity productivity 2',
        data: globalData.data2,
        fill: false,
        borderColor: 'rgba(10, 255, 10, 1)',

        }

    ]
    },
    options: {}
});
}



async function getData() {
    const response = await fetch('https://raw.githubusercontent.com/Pierian-Data/AutoArima-Time-Series-Blog/master/Electric_Production.csv');
    const data = await response.text();
    years = [];
    data1 = [];
    data2 = [];
    lines = data.split('\n').slice(1);
    lines.forEach(linea => {
        cols = linea.split(',');
        years.push(cols[0]);
        data1.push(parseFloat(cols[1]));
        data2.push(30 + parseFloat(cols[1]));
    });
    return { years, data1, data2 };
}