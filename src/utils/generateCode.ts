const generateCode = (ctx: any, elements: any) => {
    // 
    const renderRect = (ctx: any, rect: any) => {
        ctx.fillStyle = rect.fill;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }
    


    for (const element of elements) {
        if (element.type) {
            renderRect(ctx, element)
        }
    }
}


export default generateCode