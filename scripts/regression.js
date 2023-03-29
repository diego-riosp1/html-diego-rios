function linearRegression(values_x, values_y) {
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var count = 0;
  var x = 0;
  var y = 0;
  var values_length = values_x.length;
  if (values_length != values_y.length) {
    throw new Error(
      "The parameters values_x and values_y need to have same size!"
    );
  }
  if (values_length === 0) {
    return [[], []];
  }
  for (var v = 0; v < values_length; v++) {
    x = values_x[v];
    y = values_y[v];
    sum_x += x;
    sum_y += y;
    sum_xx += x * x;
    sum_xy += x * y;
    count++;
  }
  var m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
  var b = sum_y / count - (m * sum_x) / count;
  var result_values_x = [];
  var result_values_y = [];
  for (var v = 0; v < values_length; v++) {
    x = values_x[v];
    y = x * m + b;
    result_values_x.push(x);
    result_values_y.push(y);
  }
  return [m, b, result_values_y];
}

months = [1, 2, 3, 4, 5];
kwhs = [240, 250, 274, 250, 300];
l = linearRegression(months, kwhs);

const trace1 = {
  x: months,
  y: kwhs,
  mode: "markers",
  marker: {
    color: "red",
    size: 8
  },
  name: "Real consume"
};

const trace2 = {
  x: months,
  y: l[2],
  mode: "scatter",
  marker: {
    color: "gray",
    size: 8
  },
  line: {
    dash: "dashdot",
    color: "gray",
    width: 1
  },
  name: "Linear Regression"
};

const layout = {
  xaxis: { range: [0, 6], title: "Month" },
  yaxis: { range: [0, 400], title: "kWh" }
};

var data = [trace2, trace1];

Plotly.newPlot("myPlot", data, layout);
document.getElementById(
  "line"
).innerHTML = `The regression equation is given by $y=${l[0]}x+${l[1]}$.`;
