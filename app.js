let videoElement, canvasElement, ctx, model;

async function loadVideo() {
  const videoInput = document.getElementById('videoInput');
  videoElement = document.createElement('video');
  canvasElement = document.getElementById('canvas');
  ctx = canvasElement.getContext('2d');

  // Create a blob URL for the selected video file
  const selectedVideo = videoInput.files[0];
  if (selectedVideo) {
    const blobUrl = URL.createObjectURL(selectedVideo);
    videoElement.src = blobUrl;
    videoElement.width = 640;
    videoElement.height = 480;
    // videoElement.playbackRate = 0.5;
    videoElement.setAttribute('controls', true);
    videoElement.addEventListener('play', onPlay);
    // document.body.appendChild(videoElement);
    document.body.insertBefore(videoElement, canvasElement);
  }

}

async function loadModel() {
  if (!model) {
    // Load the COCO-SSD model if not already loaded
    model = await cocoSsd.load();
    console.log('Model Loaded..')
  }
}

// Function to convert an image frame to grayscale
function convertToGrayscale(frameData) {
  const { width, height, data } = frameData;
  const grayscaleData = new Uint8ClampedArray(width * height * 4);

  for (let i = 0; i < data.length; i += 4) {
    const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
    grayscaleData[i] = average;
    grayscaleData[i + 1] = average;
    grayscaleData[i + 2] = average;
    grayscaleData[i + 3] = data[i + 3];
  }

  return new ImageData(new Uint8ClampedArray(grayscaleData), width, height);
}


function invertColors(frameData) {
  console.log('Inverting colors')
  const { data, width, height, } = frameData;
  const invertedData = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < data.length; i += 4) {
    invertedData[i] = 255 - data[i];       // Red
    invertedData[i + 1] = 255 - data[i + 1]; // Green
    invertedData[i + 2] = 255 - data[i + 2]; // Blue
  }

  return new ImageData(new Uint8ClampedArray(invertedData), width, height);
}


async function onPlay() {
  console.log('video start playing....');
  async function detectFrame() {
    // Capture the current frame from the video element
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    const frameData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);

    const convertedImageData = invertColors(frameData);
    const predictions = await model.detect(convertedImageData, 30, 0.00001);

    // Clear previous drawings
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Draw bounding boxes and labels
    predictions.forEach((prediction) => {
      if (prediction.class === 'sports ball' || prediction.class === 'ball') {
        const [x, y, width, height] = prediction.bbox;
        const label = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 5;
        ctx.fillStyle = '#00FFFF';
        ctx.font = '16px Arial';
        //ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
        ctx.fillText(label, x, y > 10 ? y - 5 : 10);
      }

    });

    // Continue detecting frames while the video is playing
    if (!videoElement.paused && !videoElement.ended) {
      requestAnimationFrame(detectFrame);
    }
  }

  // Start detecting frames when the video starts playing
  detectFrame();
}