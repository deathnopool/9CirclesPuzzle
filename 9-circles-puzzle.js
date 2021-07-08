
/**
 * 当n=0时: 可以直接操作(装上或卸下)
 * 当n!=0时: 要操作第n环, 要先使得第n-1环在柄上, 第0环~第(n-2)环是卸下的状态
 * @param {*} circles 
 */
function solve(circles)
{
    let count = 0;
    function doChange(circle, solve)
    {
        if (circle.solved != solve)
        {
            circle.solved = solve;
            console.log(count++, !solve ? '装上' : '卸下', circle.name);
        }
    }
    function _solve(index)
    {
        if (index < 0)
            return;

        if (index == 0)
        {
            doChange(circles[index], true);
        }
        else
        {
            _solve(index-2);
            doChange(circles[index], true);
            _unSolve(index-2);

            _solve(index-1);
        }
    }

    function _unSolve(index)
    {
        if (index < 0)
            return;

        if (index == 0)
        {
            doChange(circles[index], false);
        }
        else
        {
            _unSolve(index-1);
            _solve(index-2);
            doChange(circles[index], false);
            _unSolve(index-1);
        }

    }

    _solve(circles.length-1);
}


const circles = new Array(6).fill(1).map((item, i) => ({ name: `第${i+1}环`, solved: false }));
solve(circles);