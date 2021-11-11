<script language="JavaScript">

var nl = getNewLine()

function getNewLine() {
	var agent = navigator.userAgent

	if (agent.indexOf("Win") >= 0)
		return "\r\n"
	else
		if (agent.indexOf("Mac") >= 0)
			return "\r"

 	return "\r"

}

pagecode = '#include<graphics.h>
#include<dos.h>
#include<stdio.h>
#include<iostream.h>
#include<iomanip.h>
#include<conio.h>
#include<ctype.h>
#include<process.h>
#include<stdlib.h>
#include<string.h>
#include<fstream.h>
#include<time.h>

#define x_offsetm 100
#define y_offsetm 130
#define rect_len 160
#define rect_w 60

#define x_offset 15
#define y_offset 15
#define cell_w 50
#define w cell_w*9
#define xpos_off 20
#define ypos_off 10

union REGS in,out;
int s[9][9];
char *level="EASY";

void draw_board(void);
int pop_board(void);
int pop_board1(void);
int callmouse(void);
void mouseposi(int &,int &,int &);
int mousehide(void);
int play_sudoku(int);
int row_check(int,int);
int col_check(int,int);
int box_check(int,int,int);
void save_sudoku();
void restrictmouseptr(int,int,int,int);
int click_check(int,int);
void draw_menu();
void rules(void);
void fillBox(int,int);
int CheckSafe(int,int,int);
int fillRemaining(int,int);
void removeKDigits(int);
int gen_sudoku(void);
void congrats();
int check_complete(void);


void main(void)
{
int gd=DETECT,gm;
initgraph(&gd,&gm,"C:\\\\Turboc3\\\\BGI");
int click,x_pos,y_pos,flag;
int d,count;
flushall();
MENU:
cleardevice();
draw_menu(); rules();
while(1){
callmouse();
mouseposi(x_pos,y_pos,click);
if(click==1){
int flag=click_check(x_pos,y_pos);
switch(flag)
{case 1:
    {//play new
     draw_board();
     count=pop_board();
     d=play_sudoku(count);
     if(d==1)
     {congrats();
     goto MENU;
     }
     if(d==0)
    { save_sudoku();}
     goto MENU;
     }
case 2:
    { //play old
    draw_board();
    count=pop_board1();
    d=play_sudoku(count);
    if(d==1)
     {congrats();
     goto MENU;
     }
    else goto MENU;
   }//case2 end
case 3:
  {//exit
  flushall();
  mousehide();
  closegraph();
  exit(1);
  }
case 4:
  { level="EASY";
    goto MENU;
    }
case 5:
  { level="MEDIUM";
    goto MENU;
    }
case 6:
  { level="HARD";
    goto MENU;
   }
default:
break;
}//switch
}//if close
}//while close
}

void draw_menu()
{
mousehide();
cleardevice();

settextstyle(TRIPLEX_FONT,HORIZ_DIR,4);
outtextxy(x_offsetm+30,10,"WELCOME TO SUDOKU PUZZLE");

settextstyle(TRIPLEX_FONT,HORIZ_DIR,3);
outtextxy(x_offsetm+26,y_offset+125,"PLAY NEW");
outtextxy(x_offsetm+28,y_offsetm+135,"PLAY OLD");
outtextxy(x_offsetm+55,y_offsetm+255,"EXIT");

rectangle(x_offsetm,y_offsetm,x_offsetm+rect_len,y_offsetm+rect_w);
int next_y1=y_offsetm+2*rect_w;
rectangle(x_offsetm,next_y1,x_offsetm+rect_len,next_y1+rect_w);
int next_y2=y_offsetm+4*rect_w;
rectangle(x_offsetm,next_y2,x_offsetm+rect_len,next_y2+rect_w);
rectangle(x_offsetm-10,y_offsetm-10,x_offsetm+170,y_offsetm+310);

rectangle(x_offsetm,y_offsetm-60,x_offsetm+(rect_len/4),y_offsetm-60+(rect_w)/2);
floodfill(x_offsetm+10,y_offsetm-50,WHITE);
rectangle(x_offsetm+60,y_offsetm-60,x_offsetm+(rect_len/4)+60,y_offsetm-60+(rect_w)/2);
floodfill(x_offsetm+70,y_offsetm-50,WHITE);
rectangle(x_offsetm+120,y_offsetm-60,x_offsetm+(rect_len/4)+120,y_offsetm-60+(rect_w)/2);
floodfill(x_offsetm+130,y_offsetm-50,WHITE);

settextstyle(SMALL_FONT,HORIZ_DIR,4);
setcolor(BLUE);outtextxy(x_offsetm+5,y_offsetm-50,"Easy");
outtextxy(x_offsetm+65,y_offsetm-50,"Medium");
outtextxy(x_offsetm+125,y_offsetm-50,"Hard");setcolor(WHITE);
settextstyle(TRIPLEX_FONT,HORIZ_DIR,3);

settextstyle(TRIPLEX_FONT,HORIZ_DIR,1);
outtextxy(x_offsetm+120,445,"Program by  HARINI.T, 12,F2,CV, Chennai");


}


int click_check(int x_pos,int y_pos)
{
int flag;
int next_y2=y_offsetm+4*rect_w;
int next_y1=y_offsetm+2*rect_w;

if((x_pos>x_offsetm)&&(x_pos<x_offsetm+rect_len)){

   if((y_pos>y_offsetm)&&(y_pos<y_offsetm+rect_w))
   {flag=1;
    return(flag);
    }

   if((y_pos>next_y1)&&(y_pos<next_y1+rect_w))
   { flag=2;
     return(flag);
    }

    if((y_pos>next_y2&&y_pos<next_y2+rect_w))
    {flag=3;
    return(flag);
    }

   if(x_pos>x_offsetm&&(x_pos<(x_offsetm+(rect_len/4))))
   { flag=4;
    return(flag);
    }

   if((x_pos>(x_offsetm+(rect_len/4)))&&(x_pos<(x_offsetm+(rect_len/4)+60)))
   { flag=5;
    return(flag);
    }

   if((x_pos>(x_offsetm+(rect_len/4))+60)&&(x_pos<(x_offsetm+(rect_len/4)+120)))
   { flag=6;
    return(flag);
    }
}
return(flag=0);
}



int row_check(int row,int num)
{
int c;
for(c=0;c<9;c++)
{
   if (s[row][c]==num)
   {
       return(0);
   }
}
return(1);
}


int col_check(int col,int num)
{
int r;
for(r=0;r<9;r++)
{
   if (s[r][col]==num)
   {
      return(0);
   }
}
return(1);
}


int box_check(int row,int col,int num)
{
int r,c,p1,p2;
p1=(row/3)*3;p2=(col/3)*3;
for(r=p1;r<p1+3;r++)
{
   for(c=p2;c<p2+3;c++)
   {
      if (s[r][c]==num)
      {
	  return(0);
      }
   }
}
return(1);
}


int play_sudoku(int count)
{
int x_pos,y_pos,click,n,row,col,sw;
char buf[2],temp[10],buffer[10];temp[0]=NULL;buffer[0]=NULL;
int dec,sign,cnt=count;
struct time t0, t1;
gettime(&t0);
sprintf(temp,"%02d:%02d:%02d",t0.ti_hour,t0.ti_min,t0.ti_sec);
while(1){
    callmouse();mouseposi(x_pos,y_pos,click);
     gettime(&t1);
     int hr=t1.ti_hour-t0.ti_hour;
     int min=t1.ti_min-t0.ti_min;if(min<0) min=60+min;
     int sec=t1.ti_sec-t0.ti_sec;if(sec<0){sec=60+sec;min=min-1;}
     sprintf(buffer,"%02d:%02d:%02d",hr,min,sec);
     settextstyle(TRIPLEX_FONT,HORIZ_DIR,2);
     setcolor(BLACK);outtextxy(500,20,temp);setcolor(WHITE);temp[0]=NULL;
     outtextxy(500,20,buffer);
     strcpy(temp,buffer);buffer[0]=NULL;
     sw=click;
	     switch(sw){
       case 1:{
	    n=getch();
	    if(n>=49 && n<=57){
	       buf[0]=(char)n;buf[1]=NULL;
	       int n1=atoi(buf);
	       row=((x_pos-x_offset)/cell_w);
	       col=((y_pos-y_offset)/cell_w);
	      if(box_check(col,row,n1)==1&&row_check(col,n1)==1&&col_check(row,n1)==1){
		if(s[col][row]==0){
		  s[col][row]=n1;cnt--;
		  x_pos=x_offset+(row*cell_w)+xpos_off;
		  y_pos=y_offset+(col*cell_w)+ypos_off;
		  mousehide();
		  settextstyle(TRIPLEX_FONT,HORIZ_DIR,3);
		  outtextxy(x_pos,y_pos,buf);
		 }
		else{
		 int dum=s[col][row];
		 x_pos=x_offset+(row*cell_w)+xpos_off;
		 y_pos=y_offset+(col*cell_w)+ypos_off;
		 mousehide();
		 settextstyle(TRIPLEX_FONT,HORIZ_DIR,3);
		 setcolor(BLACK);
		 outtextxy(x_pos,y_pos,ecvt((float)dum,0,&dec,&sign));
		 setcolor(WHITE);
		 settextstyle(TRIPLEX_FONT,HORIZ_DIR,3);
		 outtextxy(x_pos,y_pos,buf);
		 s[col][row]=n1;
		 }
	       }  //INNER IF CLOSE
	    else{
		sound(50);delay(1000);nosound();
	       }  //ELSE
	    }//OUTER IF CLOSE
	else{
	    if(n==48){
	      int dum=s[col][row];
	      x_pos=x_offset+(row*cell_w)+xpos_off;
	      y_pos=y_offset+(col*cell_w)+ypos_off;
	      mousehide();
	      settextstyle(TRIPLEX_FONT,HORIZ_DIR,3);
	      setcolor(BLACK);
	      outtextxy(x_pos,y_pos,ecvt((float)dum,0,&dec,&sign));
	      setcolor(WHITE);
	      s[col][row]=0;
	      }
	    else{
	       sound(50);delay(1000);nosound();
	    }
	}//OUTER ELSE
	break;
	} //CASE1
      case 2: {
	  n=getch();
	  if(n==88||n==120){// textcolor(CYAN + BLINK);
	     outtextxy(550,100,"Closing...");
	     delay(3000);
	     return(0);
	  }
	  else{
	     sound(50);delay(1000);nosound();
	  }
	break;
     }//CASE2
     default:break;
  } //SWITCH
if(check_complete()==0){
  return(1);
  }
fflush(stdin);
}//WHILE
}//FUNCTION


int callmouse()
{
    in.x.ax=1;
    int86(51,&in,&out);
    return 1;
}


void mouseposi(int &xpos,int &ypos,int &click)
{
     in.x.ax=3;
     int86(51,&in,&out);
     click=out.x.bx;
     xpos=out.x.cx;
     ypos=out.x.dx;
}


int mousehide()
{
    in.x.ax=2;
    int86(51,&in,&out);
    return 1;
}


void draw_board(void)
{
int i,j,k;
mousehide();
cleardevice();
for(k=0,i=x_offset;i<=x_offset+w;i+=cell_w,k++)
{
 if(k%3==0)
 {
   setlinestyle(SOLID_LINE,1,3);
   line(i,y_offset,i,y_offset+w);
   }
  else{
  setlinestyle(SOLID_LINE,1,1);
  line(i,y_offset,i,y_offset+w);
  }
}
for(k=0,j=y_offset;j<=y_offset+w;j+=cell_w,k++)
{
 if((k%3)==0)
 {
   setlinestyle(SOLID_LINE,1,3);
   line(x_offset,j,x_offset+w,j);
  }
 else {
 setlinestyle(SOLID_LINE,1,1);
 line(x_offset,j,x_offset+w,j);
 }
 callmouse();
}
}


int pop_board()
{
int n,r,c,num,row,col;
int dec,sign;

n=gen_sudoku();
  for(r=0;r<9;r++)
  {  for(c=0;c<9;c++)
      {
	 if(s[r][c]!=0)
	 { row=x_offset+((r)*cell_w);
	   col=y_offset+((c)*cell_w);
	   setcolor(GREEN);
	   settextstyle(TRIPLEX_FONT, HORIZ_DIR,3);
	   outtextxy(col+xpos_off,row+ypos_off,ecvt((float)s[r][c],0,&dec,&sign));
	   setcolor(WHITE);
	  }
      }
   }
return(n);
}


int pop_board1()
{
fstream f1;
int n,r,c,num,row,col,cnt=0;
int dec,sign;

for(r=0;r<9;r++) for(c=0;c<9;c++) s[r][c]=0;

f1.open("c:\\\\turboc3\\\\bin\\\\old.txt",ios::in);

while (!f1.eof()){
   f1>>r;f1>>c;f1>>num;
   row=x_offset+((r-1)*cell_w);
   col=y_offset+((c-1)*cell_w);
   s[r-1][c-1]=num;
   cnt++;
   settextstyle(TRIPLEX_FONT, HORIZ_DIR,3);
   setcolor(GREEN);
   outtextxy(col+xpos_off,row+ypos_off,ecvt((float)num,0,&dec,&sign));
   setcolor(WHITE);
}
f1.close();
return(82-cnt);
}


void restrictmouseptr(int x1,int y1,int x2,int y2)
{
 in.x.ax=7;
 in.x.cx=x1;
 in.x.dx=x2;
 int86(51,&in,&out);
 in.x.ax=8;
 in.x.cx=y1;
 in.x.dx=y2;
 int86(51,&in,&out);
}


void save_sudoku()
{
fstream f1;
int i,j;
f1.open("c:\\\\turboc3\\\\bin\\\\old.txt",ios::out);
for(i=0;i<9;i++)
 for(j=0;j<9;j++)
    if(s[i][j]!=0)
    {f1<<i+1<<"\\t";
    f1<<j+1<<"\\t";
    f1<<s[i][j]<<endl;
    }
f1.close();
}

void rules()
{
rectangle(290,70,632,440);
settextstyle(TRIPLEX_FONT,HORIZ_DIR,3);
setcolor(YELLOW);
outtextxy(415,70,"RULES");
settextstyle(SANS_SERIF_FONT, HORIZ_DIR,1);
outtextxy(300,115,"1.Fill rows,columns & highlighted");
outtextxy(300,135,"boxes with number from 1-9");
outtextxy(300,155,"without repetition.");
outtextxy(300,190,"2.To Quit game in-between");
outtextxy(300,210,"Left click+x+kbhit" );
outtextxy(300,245,"3.To Enter Right Click+Num Key");
outtextxy(300,265,"To Erase a number Enter 0");
outtextxy(300,300,"4.Don\'t overwrite the original number");
setcolor(GREEN);
outtextxy(300,320,"(Green coloured)");
setcolor(YELLOW);
outtextxy(300,355,"5.Answers can be overwritten");
outtextxy(300,375,"by entering a num in usual way");
setcolor(WHITE);
}



int gen_sudoku(void)
{
time_t t;
int n1;
//intialising sudoku array
for(int i=0;i<9;i++)
 for(int j=0;j<9;j++)
    s[i][j]=0;

for (i=0;i<9;i=i+3)
     fillBox(i,i);

fillRemaining(0,3);
srand((unsigned) time(&t));
if(strcmp(level,"EASY")==0)
  n1=9;
if(strcmp(level,"MEDIUM")==0)
  n1=27;
if(strcmp(level,"HARD")==0)
  n1=36;

int n=random(10)+n1;
removeKDigits(n);
return(n);
}


void fillBox(int row,int col)
{
int num;
time_t t;

srand((unsigned) time(&t));
for (int i=0; i<3; i++)
{
   for (int j=0; j<3; j++)
     {
	  do{
	     num = random(9)+1;
	     }while (!box_check(row, col, num));
	   s[row+i][col+j] = num;
       }
 }
} //function


int CheckIfSafe(int i,int j,int num)
{
if(row_check(i,num) && col_check(j,num) && box_check(i,j,num))
  return(1);
else
 return(0);
}


int fillRemaining(int i, int j)
{
 if (j>=9 && i<8)
  {
    i = i + 1;
    j = 0;
  }
 if (i>=9 && j>=9)
    return 1;

  if (i<3)
  {
   if (j<3)
      j=3;
   }
   else if (i<6)
   {
	if (j==(int)(i/3)*3)
	   j=j+3;
    }
   else{
	    if(j==6)
	    {
	       i=i+1;
	       j=0;
	       if(i>=9)
		  return 1;
	    }
}

for (int num = 1; num<=9; num++)
{
    if (CheckIfSafe(i, j, num))
    {
	s[i][j] = num;
	if (fillRemaining(i, j+1))
	    return 1;
	 s[i][j] = 0;
      }
}
return 0;
}


void removeKDigits(int K){
time_t t;

srand((unsigned) time(&t));

int i,j,r,c,cellId,n,rem;

for(i=0;i<9;i=i+3){
    for(j=0;j<9;j=j+3){
	n=K/9;
	while(n!=0){
	      cellId=random(9);
	      r=(cellId/3);
	      c=(cellId%3);
	      if(s[i+r][j+c]!=0){
		 n--;
		 s[i+r][j+c]=0;
	      }
	}
    }
}
rem=K%9;
while(rem!=0){
     cellId = random(81);
     i = (cellId/9);
     j = cellId%9;
     if (s[i][j] != 0){
	rem--;
	s[i][j] = 0;
      }
}

}


void congrats()
{
int area, temp1, temp2, left =475,top = 175;
void *p;

setcolor(YELLOW);
circle(500,200,25);
setfillstyle(SOLID_FILL, YELLOW);
floodfill(500,200, YELLOW);

setcolor(BLACK);
setfillstyle(SOLID_FILL, BLACK);
fillellipse(494,185,2,6);
fillellipse(506,185,2,6);

ellipse(500, 200, 205, 335, 20, 9);
ellipse(500, 200, 205, 335, 20, 10);
ellipse(500, 200, 205, 335, 20, 11);

area=imagesize(left,top,left+50,top+50);
p = malloc(area);
setcolor(WHITE);
settextstyle(SANS_SERIF_FONT, HORIZ_DIR, 1);
outtextxy(490,80," Excellent!");
outtextxy(490,105,"YOU WON!!!");

while(!kbhit()){
      temp1 =490 + random (98);
      temp2 = 130 + random (235);
      getimage(left, top, left + 50, top + 50, p);
      putimage(left, top, p, XOR_PUT);
      putimage(temp1 , temp2, p,XOR_PUT);
      delay(200);
      left = temp1;
      top = temp2;
    }
}

int check_complete(void){
int n,i,j;
for(n=0;n<81;n++){
   i=n%9;j=n/9;
   if(s[i][j]==0)
     return(1);
   }
return(0);
}'

document.write(pagecode);

</script>