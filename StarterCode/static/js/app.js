// Function that populates the metadata
function demoInfo(sample) {
    // console.log(sample);

    // Use d3.json to get data 
    d3.json("samples.json").then((data) => {
        
        // Grab metadata 
        let metaData = data.metadata; 
        // console.log(metaData);

        // Filter based on value of sample 
        let result = metaData.filter(sampleResult => sampleResult.id == sample);
        // console.log(result);

        // Access index 0 from array
        let resultData = result[0];
        // console.log(resultData);

        // Clear the metadata out
        d3.select("#sample-metadata").html("");

        // Use object.entries to get value key pairs
        Object.entries(resultData).forEach(([key, value]) => {
            // Add to sample data aka demo section
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);

        });
    });
}

// Function that builds out the barchart
function buildBar(sample) {
    let data = d3.json("samples.json");
    // console.log(data);

    // Use d3.json to get data 
    d3.json("samples.json").then((data) => {
        
        // Grab sample data 
        let sampleData = data.samples; 
        console.log(sampleData);

        // Filter based on value of sample 
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        // console.log(result);

        // Access index 0 from array
        let resultData = result[0];
        // console.log(resultData);

        // Get the otu_ids
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        // Build bar chart
        // Get y values and find 10 top 
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        
        // Get x values 
        let xValues = sample_values.slice(0, 10);

        // Get the labels
        let textLabels = otu_labels.slice(0, 10);

        // Filling up barchart
        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation: "h" 
        }
        // Layout title
        let layout = {
            title: "Top 10 Belly Button Bacteria"
        }

        // Plot in bar secton 
        Plotly.newPlot("bar", [barChart], layout)
    });

}

// Function the builds the bubble chart
function buildBubble(sample) {
    let data = d3.json("samples.json");
    // console.log(data);

    // Use d3.json to get data 
    d3.json("samples.json").then((data) => {
        
        // Grab sample data 
        let sampleData = data.samples; 

        // Filter based on value of sample 
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        // console.log(result);

        // Access index 0 from array
        let resultData = result[0];
        // console.log(resultData);

        // Get the otu_ids
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        // Filling up barchart
        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: { 
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }
        // Layout title
        let layout = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        }

        // Plot in bar secton 
        Plotly.newPlot("bubble", [bubbleChart], layout)
    });
}

// Function that initializes the dashboard
function initialize() {

    let data = d3.json("samples.json");
    console.log(data);
    
    // Access the dropdown selector from index.html
    var select = d3.select("#selDataset");
    
    // Use d3.json to get name data
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;
        // console.log(sampleNames);

        // Foreach to create options for each sample
        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });
    
        // When initialized, pass in info for the first sample
        let firstSample = sampleNames[0];

        // Call function to build metadata 
        demoInfo(firstSample);

        // Call function to build barchart
        buildBar(firstSample);

        // Call function to build bubble chart 
        buildBubble(firstSample);
    });
}

// Function the updates the dashboard 
function optionChanged(item) {

    // Call update to the metadata
    demoInfo(item);
    // console.log(item);

    // Call function to build out bar chart
    buildBar(item);

    // Call function to build bubble chart
    buildBubble(item);
} 

// Call initialize function 
initialize();
