document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('imageInput').addEventListener('change', handleImageChange);
  document.getElementById('downloadButton').addEventListener('click', handleDownload);
  document.getElementById('imageSize').addEventListener('change', handleImageSizeChange); // Add event listener for imageSize change
});

function handleImageChange(e) {
  if (e.target.files && e.target.files[0]) {
    const fileText = document.querySelector('.file-input-text');
    if (fileText) fileText.textContent = e.target.files[0].name;
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        processImage(img);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  }
}

function handleDownload() {
  const canvas = document.getElementById('previewCanvas');
  const image = canvas.toDataURL('image/jpg').replace('image/jpg', 'image/octet-stream');
  const link = document.createElement('a');
  const size = document.getElementById('imageSize').value;
  link.download = `passport_print_${size}.jpg`;
  link.href = image;
  link.click();
}

function handleImageSizeChange() {
  handleImageChange({ target: { files: [document.getElementById('imageInput').files[0]] } }); // Call handleImageChange with the current file
}

function processImage(img) {
  const imageSizeSelect = document.getElementById('imageSize');
  const imageSize = imageSizeSelect.value;
  const inputSize = 400;
  let numRows, numCols, outputHeight, outputWidth, gap;

  if (imageSize === '4x6') {
    gap = 0; // no gap for 4x6
    numRows = 3;
    numCols = 2;
    outputHeight = inputSize * numRows; // size of the output image (1200x800)
    outputWidth = inputSize * numCols; // size of the output image (800x800)
  } else if (imageSize === '5x7') {
    gap = 50; // 50px gap for 5x7
    numRows = 3;
    numCols = 2;
    outputHeight = inputSize * numRows + gap * (numRows + 1); // size of the output image (1350x950)
    outputWidth = inputSize * numCols + gap * (numCols + 1); // size of the output image (850x950)
  }

  const canvas = document.getElementById('previewCanvas');
  const ctx = canvas.getContext('2d');

  canvas.height = outputHeight;
  canvas.width = outputWidth;

  document.getElementById('preview').style.display = '';

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, outputWidth, outputHeight);

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const x = (col + 1) * gap + col * inputSize;
      const y = (row + 1) * gap + row * inputSize;
      ctx.drawImage(img, 0, 0, img.width, img.height, x, y, inputSize, inputSize);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, inputSize, inputSize);
    }
  }
}
