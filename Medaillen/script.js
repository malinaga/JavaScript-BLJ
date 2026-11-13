function zeichneBalken(context, x, amount, colorOfMedal) {
   context.fillStyle = colorOfMedal;
   context.fillRect(x, 0, 30, amount * 20);
   context.strokeRect(x, 0, 30, amount * 20);
}

window.onload = function() {
      const cvs = document.getElementById("cvs");
      const ctx = cvs.getContext("2d");
      
      //Canvas vertikal spiegeln
      ctx.scale(1, -1); 
      ctx.translate(0, -100); 
      
      //3x Gold
      zeichneBalken(ctx, 0, 3, "gold"); 
     
      //2x Silber
      zeichneBalken(ctx, 30, 2, "silver"); 
          
      //5x Bronze   
      zeichneBalken(ctx, 60, 5, "chocolate"); 
    }
    
   function zeichneBalken(context, x, amount, colorOfMedal) {
      context.fillStyle = colorOfMedal;
      context.fillRect(x, 0, 30, amount * 20);
      context.strokeRect(x, 0, 30, amount * 20);
   }