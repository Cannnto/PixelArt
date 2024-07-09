class Grid
{   constructor(rows,coluns)
    {   this.rows = rows;
        this.coluns = coluns;
        this.blockSize = {width: Math.ceil(canvas.width/this.coluns), height: Math.ceil(canvas.height/this.rows)};

        this.map = [];
        this.colors = [];
        this.realColors = [];
        this.currentColor;
        this.map[this.coluns*this.rows-1] = undefined;
    }

    draw(theme)
    {   var color
        if(!theme) color = 'rgba(255,255,255,0.05)';
        else color = 'rgba(0,0,0,0.05)';

        for(let eachRow = 0; eachRow < this.rows; eachRow++)
        {   ctx.strokeStyle = color;
            ctx.beginPath();
                ctx.moveTo(0, eachRow * this.blockSize.height);
                ctx.lineTo(canvas.width, eachRow * this.blockSize.height);
            ctx.closePath();
            ctx.stroke();
        }
        for(let eachColun = 0; eachColun < this.coluns; eachColun++)
        {   ctx.strokeStyle = color;
            ctx.beginPath();
                ctx.moveTo(eachColun * this.blockSize.width, 0);
                ctx.lineTo(eachColun * this.blockSize.width, canvas.height);
            ctx.closePath();
            ctx.stroke();
        }
    }

    updateMap()
    {   this.map = []
        this.map[this.coluns * this.rows-1] = undefined;
    }

    update(mouseX, mouseY, type)
    {   var colun = (Math.ceil(mouseX/this.blockSize.width));
        var row = (Math.ceil(mouseY/this.blockSize.height));

        for(let eachRow = 0; eachRow < this.rows; eachRow++)
        {   for(let eachColun = 0; eachColun < this.coluns; eachColun++)
            {   let arrayIndex = eachRow * this.coluns + eachColun;
                if(eachColun == colun-1 && eachRow == row-1)
                {   if(type)    this.map[arrayIndex] = undefined;
                    else
                    {   if(this.colors.indexOf(this.currentColor) == -1)
                        {   this.colors.push(this.currentColor);
                            this.realColors.push(`'${this.currentColor}'`);
                        }
                        this.map[arrayIndex] = this.colors.indexOf(this.currentColor);
                    }
                }
            }
        }
    }
    iterate(color)
    {   this.currentColor = color;
        this.blockSize = {width: Math.ceil(canvas.width/this.coluns), height: Math.ceil(canvas.height/this.rows)};

        for(let eachRow = 0; eachRow < this.rows; eachRow++)
        {   for(let eachColun = 0; eachColun < this.coluns; eachColun++)
            {   let arrayIndex = eachRow * this.coluns + eachColun;
                if(this.map[arrayIndex] >= 0)
                {   ctx.fillStyle = this.colors[this.map[arrayIndex]];
                    ctx.fillRect(this.blockSize.width*eachColun, this.blockSize.height*eachRow, this.blockSize.width,this.blockSize.height);
                }            
            }
        }
    }
}