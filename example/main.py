import asyncio
from datetime import datetime

from pywui import command, PyWuiApp, PyWuiWindow, listener


@listener("message", inject_window=True)
async def on_message(window: PyWuiWindow, message: str):
    print("Message received: {}".format(message))


@command(inject_window=True)
async def greet(window: PyWuiWindow):
    # window.toggle_fullscreen()
    window.emit("message", "Hello from python")
    print("Hello :::", window)
    return "Hello World!"


async def on_start(window: PyWuiWindow):
    async def send_time():
        while True:
            window.emit("time", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
            await asyncio.sleep(1)

    await asyncio.create_task(send_time())


app = PyWuiApp(
    "Main Window",
    'http://localhost:5174',
    confirm_close=False
)
main_window = app.get_main_window()
app.run(func=on_start, args=[main_window], debug=True)
