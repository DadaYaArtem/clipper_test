const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Параметры
const backgroundRect = { x: 200, y: 100, width: 200, height: 150 }; // Статичный прямоугольник
const movingRect = { x: 0, y: 150, width: 50, height: 50 }; // Двигающийся прямоугольник

// Функция для рисования прямоугольника
function drawRect(rect, color) {
    ctx.fillStyle = color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}

// Функция для проверки пересечения
function isIntersecting(rect1, rect2) {
    return !(rect2.x > rect1.x + rect1.width ||
             rect2.x + rect2.width < rect1.x ||
             rect2.y > rect1.y + rect1.height ||
             rect2.y + rect2.height < rect1.y);
}

// Функция для анимации
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем статичный прямоугольник
    drawRect(backgroundRect, 'rgba(255, 0, 0, 0.5)'); // Красный прямоугольник

    // Рисуем двигающийся прямоугольник
    drawRect(movingRect, 'rgba(0, 0, 255, 0.5)'); // Синий прямоугольник

    // Проверяем на пересечение
    if (isIntersecting(backgroundRect, movingRect)) {
        // Если пересекаются, устанавливаем высоту фона так, чтобы они больше не пересекались
        backgroundRect.height = movingRect.y - backgroundRect.y; // Устанавливаем высоту, чтобы избежать пересечения
    }

    // Обновляем позицию двигающегося прямоугольника
    movingRect.x += 2; // Двигаем вправо

    // Если двигающийся прямоугольник вышел за пределы холста, сбрасываем его
    if (movingRect.x > canvas.width) {
        movingRect.x = -movingRect.width; // Сбрасываем позицию
    }

    requestAnimationFrame(animate);
}

// Запускаем анимацию
animate();
