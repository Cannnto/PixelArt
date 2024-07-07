class Grid
{   constructor(rows,coluns)
    {   this.rows = rows;
        this.coluns = coluns;
        this.blockSize = {width: Math.ceil(canvas.width/this.coluns), height: Math.ceil(canvas.height/this.rows)};
        this.map = [];
        this.currentColor = null;
        this.colors = [];
        this.count = 0;
        for(let i=0;i<this.coluns*this.rows;i++) this.map[i] = 0;
    }
    draw()
    {   this.blockSize = {width: Math.ceil(canvas.width/this.coluns), height: Math.ceil(canvas.height/this.rows)};
        for(let eachRow = 0; eachRow < this.rows; eachRow++)
        {   ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.beginPath();
                ctx.moveTo(0, eachRow * this.blockSize.height);
                ctx.lineTo(canvas.width, eachRow * this.blockSize.height);
            ctx.closePath();
            ctx.stroke();
        }
        for(let eachColun = 0; eachColun < this.coluns; eachColun++)
        {   ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.beginPath();
                ctx.moveTo(eachColun * this.blockSize.width, 0);
                ctx.lineTo(eachColun * this.blockSize.width, canvas.height);
            ctx.closePath();
            ctx.stroke();
        }
    }
    updateMap()
    {   this.map = [0]
        for(let i = 0; i< this.coluns*this.rows; i++) this.map[i] = 0

    }

    update(mouseX, mouseY, type)
    {   var colun = (Math.ceil(mouseX/this.blockSize.width));
        var row = (Math.ceil(mouseY/this.blockSize.height));

        for(let eachRow = 0; eachRow < this.rows; eachRow++)
        {   for(let eachColun = 0; eachColun < this.coluns; eachColun++)
            {   let arrayIndex = eachRow * this.coluns + eachColun;
                if(eachColun == colun-1 && eachRow == row-1)
                {   if(type)    this.map[arrayIndex] = 0;
                    else{    
                        if(this.colors[this.colors.length-1] == this.currentColor)   this.map[arrayIndex] = this.colors[this.colors.length-2];
                        else
                        {   this.count++;
                            this.colors.push(this.count);
                            this.colors.push(this.currentColor);
                            this.map[arrayIndex] = this.count
                            ;
                        }
                    }
                }
            }
        }
    }
    iterate(color)
    {   this.currentColor = color;
        for(let eachRow = 0; eachRow < this.rows; eachRow++)
        {   for(let eachColun = 0; eachColun < this.coluns; eachColun++)
            {   let arrayIndex = eachRow * this.coluns + eachColun;
                if(this.map[arrayIndex]){

                    ctx.fillStyle = this.colors[this.colors.indexOf(this.map[arrayIndex])+1];
                    ctx.fillRect(this.blockSize.width*eachColun, this.blockSize.height*eachRow, this.blockSize.width,this.blockSize.height);
                }            
            }
        }
    }
}