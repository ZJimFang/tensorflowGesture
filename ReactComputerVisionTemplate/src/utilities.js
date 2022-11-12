import { db } from "../config/firebaseConfiguarion";

// Define our labelmap
const labelMap = {
  1: { name: "Hello", color: "red" },
  2: { name: "Thank You", color: "yellow" },
  3: { name: "I Love You", color: "lime" },
  4: { name: "Yes", color: "blue" },
  5: { name: "No", color: "purple" },
};

// Define a drawing function
export const drawRect = (
  boxes,
  classes,
  scores,
  threshold,
  imgWidth,
  imgHeight,
  ctx,
  setControllerMouseX,
  setControllerMouseY
) => {
  for (let i = 0; i <= boxes.length; i++) {
    if (boxes[i] && classes[i] && scores[i] > threshold) {
      const [y, x, height, width] = boxes[i];
      const text = classes[i];
      const bios = 200;

      //move
      if (classes[i] === 1) {
        console.log(x * imgWidth, y * imgHeight + bios, text);
        db.ref("playerMouse3/one").set({
          MouseX: parseInt(x * imgWidth),
          MouseY: parseInt(y * imgHeight + bios),
        });

        ctx.strokeStyle = labelMap[text]["color"];
        ctx.lineWidth = 10;
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.beginPath();

        ctx.rect(
          x * imgWidth,
          y * imgHeight,
          (width * imgWidth) / 2,
          (height * imgHeight) / 1.5
        );
        ctx.stroke();
      }

      //release
      if (classes[i] === 3) {
        db.ref("food/isClick").set({
          one: false,
        });

        ctx.strokeStyle = labelMap[text]["color"];
        ctx.lineWidth = 10;
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.beginPath();

        ctx.rect(
          x * imgWidth,
          y * imgHeight,
          (width * imgWidth) / 2,
          (height * imgHeight) / 1.5
        );
        ctx.stroke();
      }

      //hold
      if (classes[i] === 4) {
        //for click same place
        db.ref("food/ClickIn").set({
          one: { controllerMouseX: 0, controllerMouseY: 0 },
        });
        db.ref("food/ClickIn").set({
          one: {
            controllerMouseX: parseInt(x * imgWidth),
            controllerMouseY: parseInt(y * imgHeight + bios),
          },
        });

        db.ref("food/isClick").set({
          one: true,
        });

        ctx.strokeStyle = labelMap[text]["color"];
        ctx.lineWidth = 10;
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.beginPath();

        ctx.rect(
          x * imgWidth,
          y * imgHeight,
          (width * imgWidth) / 2,
          (height * imgHeight) / 1.5
        );
        ctx.stroke();
      }
    }
  }
};
