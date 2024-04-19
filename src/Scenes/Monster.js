class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = { sprite: {} };  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        // Create jump speed variable
        this.vertSpeed = 0;

        // Create variable to keep track of player groundedness
        this.isGrounded = true;

        // Create keys
        this.aKey;
        this.dKey;
        this.spaceKey;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");

        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        // Body
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");

        // Mouths
        my.sprite.fangMouth = this.add.sprite(this.bodyX, this.bodyY - 50, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.smileMouth = this.add.sprite(this.bodyX, this.bodyY - 50, "monsterParts", "mouth_closed_happy.png");

        // Legs
        my.sprite.rightLeg = this.add.sprite(this.bodyX + 100, this.bodyY + 100, "monsterParts", "leg_greenA.png");
        my.sprite.leftLeg = this.add.sprite(this.bodyX - 100, this.bodyY + 100, "monsterParts", "leg_greenA.png");
        my.sprite.leftLeg.flipX = true;

        // Arms
        my.sprite.rightArm = this.add.sprite(this.bodyX + 125, this.bodyY - 25, "monsterParts", "arm_greenC.png");
        my.sprite.rightArm.rotation = 100;
        my.sprite.leftArm = this.add.sprite(this.bodyX - 105, this.bodyY - 10, "monsterParts", "arm_greenB.png");
        my.sprite.leftArm.flipX = true;
        my.sprite.leftArm.rotation = -125;

        // Eyes
        my.sprite.rightEye = this.add.sprite(this.bodyX + 30, this.bodyY - 100, "monsterParts", "eye_human_blue.png");
        my.sprite.leftEye = this.add.sprite(this.bodyX - 30, this.bodyY - 100, "monsterParts", "eye_human_green.png");
        my.sprite.leftEye.flipX = true;

        // Details
        my.sprite.rightHorn = this.add.sprite(this.bodyX + 50, this.bodyY - 135, "monsterParts", "detail_blue_horn_large.png");
        my.sprite.rightHorn.rotation = 6;
        my.sprite.leftHorn = this.add.sprite(this.bodyX - 50, this.bodyY - 130, "monsterParts", "detail_blue_horn_small.png");
        my.sprite.leftHorn.flipX = true;
        my.sprite.leftHorn.rotation = -6;

        my.sprite.fangMouth.visible = false;


        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Fangs
        this.input.keyboard.on('keydown-F', (event) => {
            my.sprite.smileMouth.visible = false;
            my.sprite.fangMouth.visible = true;
        })

        // Regular Smile
        this.input.keyboard.on('keydown-S', (event) => {
            my.sprite.smileMouth.visible = true;
            my.sprite.fangMouth.visible = false;

        })

        // Jump
        this.input.keyboard.on('keydown-W', (event) => {
            this.vertSpeed = -7.5;
        })

    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        // Polling input for left-right movement
        if (this.aKey.isDown) {
            for (let sprite in my.sprite)
                my.sprite[sprite].x -= 1;

        } else if (this.dKey.isDown) {
            for (let sprite in my.sprite)
                my.sprite[sprite].x += 1;
        }

        if (my.sprite.body.y > 400) {
            if (!this.isGrounded) {
                // console.log("on ground, vert speed:", this.vertSpeed);
                this.vertSpeed = 0;
                this.isGrounded = true;
            }
        } else {
            if (this.isGrounded) {
                // console.log("off ground");
                this.isGrounded = false;
            }
            // console.log("accelerating down");
            this.vertSpeed += 0.125;
        }

        for (let sprite in my.sprite)
            my.sprite[sprite].y += this.vertSpeed;


        // Horrifying Quick Attempt at Making the Limbs Animate During a Jump
        // if (this.vertSpeed < 0) {
        //     for (let sprite in my.sprite)
        //         my.sprite[sprite].rotation += 0.1;
        // } if (this.vertSpeed > 0) {
        //     for (let sprite in my.sprite)
        //         my.sprite[sprite].rotation -= 0.1;
        // }

    }



}