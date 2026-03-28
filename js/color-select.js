// // Color select logic for new-product and flash-sale
// function setupColorSelect() {
//   document.querySelectorAll('.flash-sale-colors').forEach(function(colorGroup) {
//     const colorDots = colorGroup.querySelectorAll('.flash-sale-color-dot');
//     colorDots.forEach(function(dot, idx) {
//       dot.addEventListener('click', function() {
//         colorDots.forEach(d => d.classList.remove('selected'));
//         dot.classList.add('selected');
//       });
//       // Đảm bảo chỉ có 1 selected mặc định
//       if (idx === 0 && !colorGroup.querySelector('.selected')) {
//         dot.classList.add('selected');
//       }
//     });
//   });
// }
// window.addEventListener('DOMContentLoaded', setupColorSelect);
