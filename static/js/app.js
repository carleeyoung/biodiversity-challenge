d3.json("data/samples.json").then(function(data) { 
  // data for all samples
    var sampleData = data.samples;

  // create option list for id
    var Options = d3.select("#selDataset");
      Options.html("");
      Options.append("option").html;
      sampleData.map(sample => Options.append("option").html(sample.id));
  });
  
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var id = d3.select("option").node().value;
};

function buildPlot(id) {
d3.json("data/samples.json").then(function(data) {
    
  // data for all samples
    var sampleData = data.samples;

  // filter data for samples matching dropdown option id
    var sampleById = sampleData.filter(sample => sample.id === id);

  // select sample values
    var sampleValues = sampleById.map(sample => sample.sample_values);

  // slice and reverse the sample values for horizontal bar chart
    var sampleValues10 = (sampleValues[0].slice(0,10)).reverse();

  // select otu ids
    var otu = sampleById.map(sample => sample.otu_ids);
 
    for (var i = 0; i < otu.length; i++) {

        for (var j = 0; j < otu[i].length; j++) {
          var otu_id = otu[i].map(j => `OTU_${j}`);
        };
    };
  // slice and reverse the otu_ids for horizontal bar chart
    var otu_id_10 = (otu_id.slice(0, 10)).reverse();
  
  // get labels
    var labels = sampleById.map(sample => sample.otu_labels);

  // slice and reverse labels for horizontal bar chart
    var labels_10 = labels[0].slice(0,10).reverse();

  // Build horizontal bar plot
    var trace1 = {
    x: sampleValues10,
    y: otu_id_10,
    text: labels_10,
    type: "bar",
    name: "Navel Bacteria",
    orientation: "h"
    };

    var data  = [trace1];

    var layout = {
      title: `Top Ten Navel Bacteria for Person Id: ${id}`

    };

    Plotly.newPlot("bar", data, layout)

  // Build bubble plot
    var trace1 = {
      x: otu[0],
      y: sampleValues[0],
      mode: 'markers',
      text: labels[0],
      marker: {
        size: sampleValues[0],
        color: otu[0]
      }
    };
    
    var data  = [trace1];

    var layout = {
      title: 'Navel Bacterial Colonies',
      showlegend: false,
      xaxis: {
        title: "Microbial Species OTU_ID"
      }
    };
    Plotly.newPlot("bubble", data, layout);
  });
};

// Obtain and display sample metadata
function getMetadata (id) {
  d3.json("data/samples.json").then(function(data) {
  // metadata for all samples
  var metaData = data.metadata;

  // separate arrays by id
  var metaById = metaData.filter(metaD => metaD.id == id);

  // obtain metadata for each sample
  var ethnicity = metaById[0].ethnicity;
  var gender = metaById[0].gender;
  var age = metaById[0].age;
  var location = metaById[0].location;
  var bbtype = metaById[0].bbtype;
  var wfreq = metaById[0].wfreq;

  // select demographic info div
  demographics = d3.select(".panel-body")
  // remove existing list
  demographics.html("");
  // add unordered list element
  list = demographics.append("ul list-style:none");
  
  // append stats to the list
  list.append("li list-style:none").text(`ID: ${id}`);
  list.append("br");
  list.append("li list-style:none").text(`Ethnicity: ${ethnicity}`);
  list.append("br");
  list.append("li list-style:none").text(`Gender: ${gender}`);
  list.append("br");
  list.append("li list-style:none").text(`Age: ${age}`);
  list.append("br");
  list.append("li list-style:none").text(`Location: ${location}`);
  list.append("br");
  list.append("li list-style:none").text(`Belly Button Type: ${bbtype}`);
  list.append("br");
  list.append("li list-style:none").text(`Wash Frequency: ${wfreq}`);
  

  // Build Guage Chart
  var trace1 = {
    value: wfreq,
    title: {
      text: "Belly Button Washing Frequency<br><span style='font-size:0.8em'>Scrubs Per Week</span>"
    },
    type: "indicator",
    mode: "gauge+number",
    delta: {
      reference: 0
    },
    gauge: {
      axis: {
        range: [0, 9]
      },
      steps: [
        { range: [0, 1], color: "#ffffff" },
        { range: [1, 2], color: "#f0f5f5" },
        { range: [2, 3], color: "#e0ebeb" },
        { range: [3, 4], color: "#d1e0e0" },
        { range: [4, 5], color: "#c2d6d6" },
        { range: [5, 6], color: "#b3cccc" },
        { range: [6, 7], color: "#a3c2c2" },
        { range: [7, 8], color: "#94b8b8" },
        { range: [8, 9], color: "#85adad" }
      ],
      bar: {
        color: "#3366cc"
      },
    },
  };
  var data = [trace1];
  
  var layout = { width: 600, height: 400 };

  Plotly.newPlot('gauge', data, layout);
});
};

buildPlot("940");
getMetadata("940");
