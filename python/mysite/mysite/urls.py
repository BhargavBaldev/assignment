
from django.contrib import admin
from django.urls import path
from register import views as vs
from django.contrib.auth.views import LoginView,LogoutView

urlpatterns = [
    path('',vs.register),
    path('admin/', admin.site.urls),
    
    path('login/',LoginView.as_view(),name="login"),
    path('dashboard/',vs.dashboard,name='dashboard'),
    path('logout/',LogoutView.as_view(next_page='login'),name="logout"),
]
