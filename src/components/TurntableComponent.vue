<template>
    <div class="Lottery">
        <div class="turntable">
        <div class="start"
            :style="{
                transform : turntableTransform,
                transition : isSpinning ? turntableTransition : null
            }">
            <div v-for="(item , index) in app.AwardsArray" 
                :key="index"
                class="item"
                :style="{
                    background : `conic-gradient(${app.AwardsColor[index]} 0% ${app.Slice}%, transparent ${app.Slice}% 100%)`,
                    transform: `rotate(${app.Angle * index}deg)`
                    }">
                    <div class="inner"
                        :style="{
                            transform: `rotate(${ app.Angle == 360 ? 0 : app.Angle /2 }deg)`
                        }">
                        <span>{{item}}</span>
                    </div>
                </div>
            </div>
            <div class="pointer"></div>
        </div>
        <div class="btn_start">
            <button class="btn btn-success" @click="start">開抽!</button>
        </div>
    </div>
</template>

<script setup>
import {defineProps , ref , reactive  , watch }  from 'vue'

const props = defineProps({
    AwardsValue:Array
})


class AppComponent {
    title = 'lottery';
    AwardsArray = [];
    Old_AwardsArray_Length = 0;
    AwardsStyles = [];
    AwardsColor = [];
    Angle = 0;
    Slice = 0;
}

const app = reactive(new AppComponent());
const isSpinning = ref(false); // 抽獎是否進行中
const turntableTransform = ref('rotate(0deg)'); // 轉盤的旋轉角度
const turntableTransition = ref('none'); // 轉盤的動畫

watch(
    () =>props.AwardsValue,
    (newValue , oldValue) =>{
        app.AwardsArray = newValue;
        app.Old_AwardsArray_Length = oldValue??length
        calculateItemStyles()
    }
);

const calculateItemStyles = ()=>{
    if(app.AwardsArray != null)
    {
        const AwardsArray_Length = app.AwardsArray.length;
        app.Angle = (360 / AwardsArray_Length);
        app.Slice = app.Angle / 3.6
        app.AwardsArray.forEach( (item ,index)=>{
        const color = index > app.Old_AwardsArray_Length ? getRandomColor() : 
                                                           app.AwardsColor[index] == undefined ? getRandomColor() : app.AwardsColor[index]
            app.AwardsColor[index] = color;
        });
    }
}

const getRandomColor = () =>{
    let r, g, b;
            let luminance;

            // 隨機產生顏色，直到它符合條件
            do {
                const minR = 229, maxR = 255;
                const minG = 204, maxG = 229;
                const minB = 204, maxB = 229;

                // 隨機生成每個分量
                r = Math.floor(Math.random() * (maxR - minR + 1)) + minR;
                g = Math.floor(Math.random() * (maxG - minG + 1)) + minG;
                b = Math.floor(Math.random() * (maxB - minB + 1)) + minB;

                // 避免產生黑色、白色或灰色
            } while (
                (r === g && g === b) ||  // 避免灰色
                (r === 0 && g === 0 && b === 0) || // 避免黑色
                (r === 255 && g === 255 && b === 255) || // 避免白色||
                (g > r && g > b)  // 排除綠色
            );

            // 計算顏色的亮度
            luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

            // 確保顏色是淺色
            if (luminance < 128) {
                // 如果顏色偏暗，將它調亮
                r = Math.min(r + 100, 255);
                g = Math.min(g + 100, 255);
                b = Math.min(0);
            }
            // 返回顏色
            return `rgba(${r}, ${g}, ${b})`;
};

const start = ()=>{
    if (app.AwardsArray.length < 2) {
        alert('請先填寫選項!');
        return;
    }

    if(isSpinning.value == true)
        return;

    console.log('start');
    isSpinning.value = true;

  // 獲取當前角度
  const currentAngle = Math.round(getAngleFromMatrix(turntableTransform.value) *100) /100;
  const newAngle = 3600 + currentAngle + Math.random() * 330 + 30;
  console.log(currentAngle)
  console.log(newAngle)
  // 設置動畫
  
  turntableTransition.value = '10s transform ease-in-out';

  // 停止後處理
  setTimeout(() => {
    isSpinning.value = false;
    turntableTransition.value = 'none';
    turntableTransform.value = `rotate(${newAngle % 360}deg)`;
    // 計算選中的獎項
    const finalAngle = 360 - (newAngle % 360);
    const selectedIndex = Math.ceil(finalAngle / app.Angle);

    alert(`恭喜選到第 ${selectedIndex} 個選項`);
    }, 10000);

    turntableTransform.value = `rotate(${newAngle}deg)`;
}

const getAngleFromMatrix = (transform) => {
    const values = transform.match(/matrix\((.+)\)/);
    if (!values) return 0;

    const [a, b] = values;
    const angleInRadians = Math.atan2(b, a); // 計算弧度
    const angleInDegrees = angleInRadians * (180 / Math.PI); // 將弧度轉為角度

    // 將角度範圍調整到 [0, 360]
    return (angleInDegrees + 360) % 360;
};
</script>

<style scoped>
    .Lottery{
        width: 500px;
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .turntable {
            position: absolute;
            display: flex;
            justify-content: center;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            border: 1px black solid;
        }

        .start {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden; 
        }

        .item {
            position: absolute;
            display: flex;
            width: 100%;
            height: 100%;
            text-align: center;
            justify-content: center;
            border-radius: 50%;
        }

        .btn_start {
            position: relative;
            z-index: 9999;
            align-items: center;
            top: -2%;
        }

        .pointer {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 20px solid transparent;
            border-top: 20px solid red;
            z-index: 10;
        }

</style>