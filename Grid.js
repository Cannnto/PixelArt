class Grid
{   constructor(rows,coluns)
    {   this.rows = rows;
        this.coluns = coluns;
        this.blockSize = {width: Math.ceil(canvas.width/this.coluns), height: Math.ceil(canvas.height/this.rows)};

        this.map = [];
        this.colors = [];
        this.realColors = [];
        this.bucket = [];
        this.bucketColor;
        this.currentColor;
        this.map[this.coluns*this.rows-1] = undefined;
        this.count = 0;

        this.countAux = 4;
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



    update(mouseX, mouseY, brush, gotas, bucket)
    {   var colun = (Math.ceil(mouseX/this.blockSize.width));
        var row = (Math.ceil(mouseY/this.blockSize.height));

        for(let eachRow = 0; eachRow < this.rows; eachRow++)
        {   for(let eachColun = 0; eachColun < this.coluns; eachColun++)
            {   let arrayIndex = eachRow * this.coluns + eachColun;
                if(eachColun == colun-1 && eachRow == row-1)
                {   if(brush)    this.map[arrayIndex] = undefined;
                    else
                    {   
                        if(gotas) color.value = this.colors[this.map[arrayIndex]];
                        else
                        {   if(bucket && !this.bucket.length)
                            {   this.bucket.push({x: eachColun, y: eachRow});
                                this.bucketColor = this.colors[this.map[arrayIndex]];
                            }
                            else{
                                if(this.colors.indexOf(this.currentColor) == -1)
                                {   this.colors.push(this.currentColor);
                                    this.realColors.push(`'${this.currentColor}'`);
                                }
                                this.map[arrayIndex] = this.colors.indexOf(this.currentColor);
                            }
                        }
                    }
                }
            }
        }
    }
    iterate(color)
    {   this.currentColor = color;
        this.blockSize = {width: Math.ceil(canvas.width/this.coluns), height: Math.ceil(canvas.height/this.rows)};


        // var currentBucket = this.bucket[0];
        // if(currentBucket)   var currentBucketPOS = currentBucket.y * this.coluns + currentBucket.x;
        
        // this.bucket.shift();

        // if(currentBucket && currentBucket.x >= 0 && currentBucket.y >= 0 && currentBucket.x < this.coluns && currentBucket.y < this.rows && this.colors[this.map[currentBucketPOS]] == this.bucketColor)
        // {   if(this.colors.indexOf(this.currentColor) == -1)
        //     {   this.colors.push(this.currentColor);
        //         this.realColors.push(`'${this.currentColor}'`);
        //     }
        //     this.map[currentBucketPOS] = this.colors.indexOf(this.currentColor);

        //     this.bucket.push({x: currentBucket.x+1, y: currentBucket.y});
        //     this.bucket.push({x: currentBucket.x, y: currentBucket.y+1});
        //     this.bucket.push({x: currentBucket.x-1, y: currentBucket.y});
        //     this.bucket.push({x: currentBucket.x, y: currentBucket.y-1});
        // }
    

        /* 2.0
        var currentBucket = this.bucket[this.bucket.length-1];
        if(currentBucket) var currentBucketPOS = currentBucket.y * this.coluns + currentBucket.x;

        this.bucket.pop();
        
        if(currentBucket && currentBucket.x >= 0 && currentBucket.y >= 0 && currentBucket.x < this.coluns && currentBucket.y < this.rows && this.colors[this.map[currentBucketPOS]] == this.bucketColor)
        {   
            if(this.colors.indexOf(this.currentColor) == -1)
            {   this.colors.push(this.currentColor);
                this.realColors.push(`'${this.currentColor}'`);
            }
            this.map[currentBucketPOS] = this.colors.indexOf(this.currentColor);
            this.bucket.push({x: currentBucket.x+1, y: currentBucket.y});
            this.bucket.push({x: currentBucket.x, y: currentBucket.y+1});
            this.bucket.push({x: currentBucket.x-1, y: currentBucket.y});
            this.bucket.push({x: currentBucket.x, y: currentBucket.y-1});
        }
    
        */
        for(let i=0;i<this.bucket.length;i++)
        {   var currentBucket = this.bucket[0];
            var currentBucketPOS = currentBucket.y * this.coluns + currentBucket.x;

            this.bucket.shift();
            
            if(currentBucket.x >= 0 && currentBucket.y >= 0 && currentBucket.x < this.coluns && currentBucket.y < this.rows && this.colors[this.map[currentBucketPOS]] == this.bucketColor)
            {   
                if(this.colors.indexOf(this.currentColor) == -1)
                {   this.colors.push(this.currentColor);
                    this.realColors.push(`'${this.currentColor}'`);
                }
                this.map[currentBucketPOS] = this.colors.indexOf(this.currentColor);
                this.bucket.push({x: currentBucket.x+1, y: currentBucket.y});
                this.bucket.push({x: currentBucket.x, y: currentBucket.y+1});
                this.bucket.push({x: currentBucket.x-1, y: currentBucket.y});
                this.bucket.push({x: currentBucket.x, y: currentBucket.y-1});
            }
        }


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