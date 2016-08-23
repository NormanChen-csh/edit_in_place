"use strict";

class EditInPlaceField {
    constructor(id,parent,value) {
        this.id = id;
        this.value = value || 'default value';
        this.containerElement = null;
        this.parentElement = parent;
        this.createElements(this.id);
        this.attachEvents();
    }

    createElements(id) {
        this.containerElement = document.createElement('div');
        this.parentElement.appendChild(this.containerElement).setAttribute('id',this.id);

        this.staticElement = document.createElement('span');
        this.containerElement.appendChild(this.staticElement);
        this.staticElement.innerHTML = this.value;

        // 创建input
        this.fieldElement = document.createElement('input');
        //类型为文本框
        this.fieldElement.type = 'text';
        //值为无名氏
        this.fieldElement.value = this.value;
        //添加到containerElement上
        this.containerElement.appendChild(this.fieldElement);

        //创建一个保存按钮
        this.saveButton = document.createElement('input');
        //类型为按钮
        this.saveButton.type = 'button';
        //按钮的名字为保存
        this.saveButton.value = '保存';
        // 把按钮加到containerElement里面
        this.containerElement.appendChild(this.saveButton);

        //创建取消按钮
        this.cancelButton = document.createElement('input');
        //类型为button
        this.cancelButton.type = 'button';
        //文字为取消
        this.cancelButton.value = '取消';
        //添加
        this.containerElement.appendChild(this.cancelButton);

        this.convertToText();
    }

    convertToText() {
        //将文本框 以及两个按钮 隐藏起来
        this.fieldElement.style.display = 'none';
        this.saveButton.style.display = 'none';
        this.cancelButton.style.display = 'none';

        this.staticElement.style.display = 'inline';
        this.setValue(this.value);
    }

    attachEvents() {
        let that = this;
        console.log(that);//EditInPlaceField
        //span 的点击事件
        this.staticElement.addEventListener('click',function() {
            //将状态切换为
            console.log(this);//span
            that.convertToEditable();
        },false);

        //绑定取消按钮的事件
        //从编辑状态切换为文本状态
        this.cancelButton.addEventListener('click',function() {
            that.cancel();
        },false);

        this.saveButton.addEventListener('click',function() {
            that.save();
        },false);
    }

    convertToEditable() {
        this.staticElement.style.display = 'none';
        // 将编辑元素显示
        this.fieldElement.style.display = 'inline-block';
        this.saveButton.style.display = 'inline-block';
        this.cancelButton.style.display = 'inline-block';
    }

    setValue(value) {
        this.fieldElement.value = value;
        //设置span html
        this.staticElement.innerHTML = value;
    }

    cancel() {
        this.convertToText();
    }

    save() {
        this.value = this.getValue();
        this.convertToText();

    }

    getValue() {
        //获取当前值
        return this.fieldElement.value;
    }
}
