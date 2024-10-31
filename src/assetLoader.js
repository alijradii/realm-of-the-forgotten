const fighterAnimTemplate = {
    idle: {
        repeat: -1,
        frameRate: 4,
        up: {
            frames: [80, 81, 82, 83],
        },
        down: {
            frames: [40, 41, 42, 43],
        },
        left: {
            frames: [0, 1, 2, 3],
        },
        right: {
            frames: [0, 1, 2, 3],
        },
    },
    walk: {
        repeat: -1,
        frameRate: 6,
        up: {
            frames: [88, 89, 90, 91],
        },
        down: {
            frames: [48, 49, 50, 51],
        },
        left: {
            frames: [8, 9, 10, 11],
        },
        right: {
            frames: [8, 9, 10, 11],
        },
    },
    attack: {
        frameRate: 6,
        up: {
            frames: [96, 97, 98, 99],
        },
        down: {
            frames: [56, 57, 58, 59],
        },
        left: {
            frames: [16, 17, 18, 19],
        },
        right: {
            frames: [16, 17, 18, 19],
        },
    },
    death: {
        frameRate: 4,
        up: {
            frames: [104, 105, 106, 107],
        },
        down: {
            frames: [64, 65, 66, 67],
        },
        left: {
            frames: [24, 25, 26, 27],
        },
        right: {
            frames: [24, 25, 26, 27],
        },
    },
};

function loadAssets(scene) {
    scene.load.spritesheet("arrow", "assets/images/arrow.png", {
        frameWidth: 16,
        frameHeight: 16,
    });

    classes.forEach((baseClass) => {
        const colors = ["Red", "Blue", "Green"];

        colors.forEach((color) => {
            const name = `${baseClass}_${color}`;
            const path = `assets/images/${baseClass}/${name}.png`;

            scene.load.spritesheet(name, path, {
                frameWidth: 32,
                frameHeight: 32,
            });
        });
    });
}

function loadAnimations(scene) {
    classes.forEach((baseClass) => {
        const colors = ["Red", "Blue", "Green"];

        colors.forEach((color) => {
            const name = `${baseClass}_${color}`;
            const path = `assets/images/${baseClass}/${name}.png`;

            Object.keys(fighterAnimTemplate).forEach((animation) => {
                const mp = fighterAnimTemplate[animation];
                const dirs = ["up", "down", "left", "right"];

                dirs.forEach((dir) => {
                    scene.anims.create({
                        key: `${name}_${animation}_${dir}`,
                        frameRate: mp.frameRate || 4,
                        frames: scene.anims.generateFrameNames(name, {
                            frames: mp[dir].frames,
                        }),
                        repeat: mp.repeat || 0,
                    });
                });
            });
        });
    });
}
